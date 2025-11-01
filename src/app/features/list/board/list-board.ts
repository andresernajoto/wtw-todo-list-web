import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { List } from "../../../core/models/list";
import { Item } from "../../../core/models/item";
import { Column } from "../../../core/models/column";
import { ItemDrawerComponent } from "../../item/drawer/item-drawer";
import {CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  standalone: true,
  selector: 'app-list-board',
  templateUrl: './list-board.html',
  imports: [CommonModule, ItemDrawerComponent, DragDropModule],
})
export class ListBoardComponent {
  @Input() list!: List;

  drawerOpen = false;

  columns: Column[] = [
    { title: 'Criado', items: [] },
    { title: 'Em Andamento', items: [] },
    { title: 'Concluído', items: [] },
  ];

  openDrawer() {
    this.drawerOpen = true;
  }

  closeDrawer() {
    this.drawerOpen = false;
  }

  handleItemSave(item: Item) {
    this.columns[0].items.push(item);
    this.closeDrawer();
  }

  drop(event: CdkDragDrop<Item[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
