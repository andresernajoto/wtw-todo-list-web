import { Component, EventEmitter, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { List } from "../../../core/models/list";
import { ListService } from "../../../core/services/list.service";

@Component({
  standalone: true,
  selector: 'app-list-sidebar',
  templateUrl: './list-sidebar.html',
  imports: [CommonModule],
})
export class ListSidebarComponent {
  @Output() createList = new EventEmitter<void>();
  @Output() selectList = new EventEmitter<List>();

  lists: List[] = [];

  constructor(private _listService: ListService) {
    this.loadLists();
  }

  loadLists() {
    this._listService.getAll().subscribe((res) => (this.lists = res));
  }

  onSelect(list: List) {
    this.selectList.emit(list);
  }
}
