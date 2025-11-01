import { Routes } from "@angular/router";
import { ListComponent } from "./list";

export default [
  {
    path: '',
    component: ListComponent,
    children: [
      {
        path: '',
        component: ListComponent
      }
    ]
  }
] as Routes;