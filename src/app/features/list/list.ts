import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Subject } from "rxjs";

@Component({
  standalone: true,
  selector: 'app-list',
  templateUrl: './list.html',
  imports: [CommonModule, RouterModule]
})
export class ListComponent implements OnInit, OnDestroy {
  private _subject: Subject<any> = new Subject<any>();

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this._subject.unsubscribe();
  }
}