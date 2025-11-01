import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { listModule } from './list.module';
import { List } from '../../core/models/list';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../../core/services/list.service';

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
    private _cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
  this._activatedRoute.paramMap.subscribe(params => {
    const listId = Number(params.get('id'));
    console.log(listId)
    
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
    this._listService.getById(listId).subscribe((newList) => {
      this.selectedList = newList;
      this.creatingList = false;

      this._cd.detectChanges();
    });
  }
}
