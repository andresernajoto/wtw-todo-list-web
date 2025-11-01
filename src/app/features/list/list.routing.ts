// routing.ts
import { Routes } from "@angular/router";
import { ListComponent } from "./list";

export default [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: ':id',
    component: ListComponent
  }
] as Routes;