import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { listModule } from "../list.module";
import { ListService } from "../../../core/services/list.service";
import { List } from "../../../core/models/list";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  standalone: true,
  selector: 'app-list-list',
  templateUrl: './list-list.html',
  imports: [listModule]
})
export class ListListComponent implements OnInit, OnDestroy {
  private _subject: Subject<any> = new Subject<any>();

  isLoading: boolean = false;
  errorMessage: string = '';

  lists: List[] = [];

  constructor(
    private _listService: ListService
  ) { }

  ngOnInit(): void {
    this.getAllLists();
  }

  ngOnDestroy(): void {
    this._subject.unsubscribe();
  }

  getAllLists(): void {
    this.isLoading = true;

    this._listService
      .getAll()
      .subscribe({
        next: ((resultList: List[]) => {
          this.lists = resultList;
          this.isLoading = false;
        }),
        error: ((err: HttpErrorResponse) => {
          this.errorMessage = err.message;
        })
      })
  }
}