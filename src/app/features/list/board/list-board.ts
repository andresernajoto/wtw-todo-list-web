import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Column } from '../../../core/models/column';
import { Item } from '../../../core/models/item';
import { List } from '../../../core/models/list';
import { ItemService } from '../../../core/services/item.service';
import { ListService } from '../../../core/services/list.service';
import { ITEM_STATUS_ENUM } from '../../../shared/enums/ItemStatusEnum';
import { ItemDrawerComponent } from '../../item/drawer/item-drawer';

@Component({
  standalone: true,
  selector: 'app-list-board',
  templateUrl: './list-board.html',
  imports: [CommonModule, ItemDrawerComponent, CdkDropListGroup, CdkDropList, CdkDrag, FormsModule],
})
export class ListBoardComponent implements OnInit, OnChanges {
  @Input() list?: List;
  @Output() listCreated = new EventEmitter<List>();

  newListName = '';
  itemStatusEnum = ITEM_STATUS_ENUM;

  drawerOpen = false;
  creatingList = false;
  isLoading: boolean = false;

  columns: Column[] = [
    { id: '1', title: 'Criado', items: [] },
    { id: '2', title: 'Em Andamento', items: [] },
    { id: '3', title: 'Concluído', items: [] },
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
      return;
    }

    this.getItemsFromList(this.list.id);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['list'] && this.list?.id) {
      this.creatingList = false;
      this.getItemsFromList(this.list.id);
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

    this._itemService.create(item).subscribe((createdItem) => {
      this.columns[0].items.push(createdItem);
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

  getItemsFromList(listId?: number) {
    if (!listId) return;

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
      error: (err) => {
        if (listId && err.status !== 404) {
          this._toastrService.error('Falha ao obter tarefas da lista');
        }

        this.columns.forEach((column) => (column.items = []));
        this.isLoading = false;
      },
    });
  }

  deleteItem(item: Item, columnId: string) {
    if (!confirm(`Deseja realmente excluir o item "${item.name}"?`)) return;

    this._itemService.delete(item.id).subscribe({
      next: () => {
        const column = this.columns.find((c) => c.id === columnId);
        if (column) {
          column.items = column.items.filter((i) => i.id !== item.id);
        }

        this._toastrService.success('Item excluído com sucesso!');
      },
      error: () => {
        this._toastrService.error('Erro ao excluir item.');
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

  trackByItemId(index: number, item: Item): number {
    return item.id || index;
  }
}
