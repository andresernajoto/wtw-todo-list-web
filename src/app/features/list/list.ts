import { Component } from "@angular/core";
import { listModule } from "./list.module";
import { List } from "../../core/models/list";

@Component({
  standalone: true,
  selector: 'app-list',
  templateUrl: './list.html',
  imports: [listModule],
})
export class ListComponent {
  showForm = false;
  selectedList: List | null = null;

  onCreateListClick() {
    this.showForm = true;
    this.selectedList = null;
  }

  onListCreated(newList: List) {
    this.showForm = false;
  }

  onListSelected(list: List) {
    this.selectedList = list;
    this.showForm = false;
  }

  onCancelCreate() {
    this.showForm = false;
  }
}
