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
import { ItemService } from '../../../core/services/item.service';
import { ToastrService } from 'ngx-toastr';
import { ITEM_STATUS_ENUM } from '../../../shared/enums/ItemStatusEnum';

@Component({
  standalone: true,
  selector: 'app-list-board',
  templateUrl: './list-board.html',
  imports: [CommonModule, ItemDrawerComponent, DragDropModule, FormsModule],
})
export class ListBoardComponent implements OnInit {
  @Input() list?: List;
  @Output() listCreated = new EventEmitter<List>();

  newListName = '';
  itemStatusEnum = ITEM_STATUS_ENUM;
  
  drawerOpen = false;
  creatingList = false;
  isLoading: boolean = false;

  columns: Column[] = [
    { title: 'Criado', items: [] },
    { title: 'Em Andamento', items: [] },
    { title: 'Concluído', items: [] },
  ];

  constructor(
    private _listService: ListService,
    private _itemService: ItemService,
    private _router: Router,
    private _toastrService: ToastrService
  ) {}

  ngOnInit() {
    if (!this.list) {
      this.creatingList = true;
    }

    this.getItemsFromList(this.list?.id!);
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

      this._toastrService.success('Lista criada com sucesso!');
    });
  }

  openDrawer() {
    if (!this.list?.id) {
      return;
    }

    this.drawerOpen = true;
  }

  closeDrawer() {
    this.drawerOpen = false;
  }

  handleItemSave(item: Item) {
    this.isLoading = true;

    this._itemService.create(item).subscribe(() => {
      this.columns[0].items.push(item);
      this.closeDrawer();

      this._toastrService.success('Tarefa vinculada à lista');
      this.isLoading = false;
    });
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

  getItemsFromList(listId: number) {
    this.isLoading = true;

    this._itemService.getAllFromList(listId).subscribe({
      next: (items: Item[]) => {
        this.columns.forEach((column) => (column.items = []));

        items.forEach((item) => {
          const columnIndex = this.getColumnIndexByStatus(item.statusId);
          if (columnIndex !== -1) {
            this.columns[columnIndex].items.push(item);
          }
        });

        this.isLoading = false;
      },
      error: () => {
        this._toastrService.error('Falha ao obter tarefas da lista');
        this.isLoading = false;
      },
    });
  }

  private getColumnIndexByStatus(status: ITEM_STATUS_ENUM): number {
    switch (status) {
      case ITEM_STATUS_ENUM.Criado:
        return 0;
      case ITEM_STATUS_ENUM.EmAndamento:
        return 1;
      case ITEM_STATUS_ENUM.Concluido:
        return 2;
      default:
        return 0;
    }
  }
}
