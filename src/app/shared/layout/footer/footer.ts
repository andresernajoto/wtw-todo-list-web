import { Component, OnInit } from "@angular/core";
import { layoutModule } from "../layout.module";

@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './footer.html',
  imports: [layoutModule]
})
export class FooterComponent implements OnInit {
  ngOnInit(): void {
    
  }
}