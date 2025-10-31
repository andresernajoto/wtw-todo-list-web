import { Component, OnInit } from "@angular/core";
import { layoutModule } from "../layout.module";

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.html',
  imports: [layoutModule],
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {
    
  }
}