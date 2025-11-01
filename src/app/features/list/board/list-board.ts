import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Column } from '../../../core/models/column';
import { Item } from '../../../core/models/item';
import { List } from '../../../core/models/list';
import { ListService } from '../../../core/services/list.service';
import { ItemDrawerComponent } from '../../item/drawer/item-drawer';

@Component({
  standalone: true,
  selector: 'app-list-board',
  templateUrl: './list-board.html',
  imports: [CommonModule, ItemDrawerComponent, DragDropModule, FormsModule],
})
export class ListBoardComponent implements OnInit {
  @Input() list?: List;
  @Output() listCreated = new EventEmitter<List>();

  creatingList = false;
  newListName = '';
  drawerOpen = false;

  columns: Column[] = [
    { title: 'Criado', items: [] },
    { title: 'Em Andamento', items: [] },
    { title: 'Concluído', items: [] },
  ];

  constructor(
    private _listService: ListService,
    private _router: Router
  ) {}

  ngOnInit() {
    if (!this.list) {
      this.creatingList = true;
    }
  }

  saveList() {
    const trimmedName = this.newListName.trim();

    if (!trimmedName) return;

    this._listService.create(trimmedName).subscribe((newList) => {
      this.list = newList;
      this.creatingList = false;
      this.newListName = '';

      this._router.navigate(['/listas', newList.id]);
      this.listCreated.emit(this.list);
    });
  }

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
