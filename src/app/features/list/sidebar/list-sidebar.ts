import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { List } from '../../../core/models/list';
import { ListService } from '../../../core/services/list.service';
import { Router } from '@angular/router';

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
  maxList: number = 5;
  canShowCreateButton: boolean = true;

  constructor(private _listService: ListService, private _router: Router) {
    this.loadLists();
  }

  loadLists() {
    this._listService.getAll().subscribe((res) => {
      this.lists = res;
      this.canShowCreateButton = this.lists.length < this.maxList;
    });
  }

  onSelect(list: List) {
    this.selectList.emit(list);

    if (list.id) {
      this._router.navigate(['/listas', list.id]);
    }
  }

  onCreateList() {
    this.createList.emit();
  }

  addList(newList: List) {
    this.lists.push(newList);
    if (this.lists.length >= this.maxList) {
      this.canShowCreateButton = false;
    }
  }
}
