import { Routes } from "@angular/router";
import { ListComponent } from "./list";
import { ListListComponent } from "./list-list/list-list";

export default [
  {
    path: '',
    component: ListComponent,
    children: [
      {
        path: '',
        component: ListListComponent
      }
    ]
  }
] as Routes;