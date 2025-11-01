import { CommonModule } from "@angular/common";
import { ListBoardComponent } from "./board/list-board";
import { ListSidebarComponent } from "./sidebar/list-sidebar";

export const listModule = [
  CommonModule,
  ListBoardComponent,
  ListSidebarComponent
]