import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "./shared/layout/footer/footer";
import { HeaderComponent } from "./shared/layout/header/header";

export const appModule = [
  HeaderComponent,
  FooterComponent,
  RouterOutlet
]