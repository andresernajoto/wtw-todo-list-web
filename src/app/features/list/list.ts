import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { List } from '../../core/models/list';
import { ListService } from '../../core/services/list.service';
import { listModule } from './list.module';

@Component({
  standalone: true,
  selector: 'app-list',
  templateUrl: './list.html',
  imports: [listModule],
})
export class ListComponent implements OnInit {
  selectedList?: List;
  creatingList = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _listService: ListService,
    private _cd: ChangeDetectorRef,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params) => {
      const listId = Number(params.get('id'));

      if (listId) {
        this.getListById(listId);
      } else {
        this.selectedList = undefined;
        this.creatingList = false;
      }
    });
  }

  onListSelected(list: List) {
    this.selectedList = list;
    this.creatingList = false;
  }

  onCreateListClick() {
    this.selectedList = undefined;
    this.creatingList = true;
  }

  onListCreated(newList: List) {
    this.selectedList = newList;
    this.creatingList = false;
  }

  getListById(listId: number) {
    this._listService.getById(listId).subscribe({
      next: (newList) => {
        this.selectedList = newList;
        this.creatingList = false;

        this._cd.detectChanges();
      },
      error: () => {
        this._router.navigate(['/listas']);
      }
    });
  }
}
