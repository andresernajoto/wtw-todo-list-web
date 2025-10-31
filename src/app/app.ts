import { Component, signal } from '@angular/core';
import { appModule } from './app.module';

@Component({
  selector: 'app-root',
  imports: [appModule],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('To-Do List');
}
