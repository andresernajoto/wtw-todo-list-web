import { Component, EventEmitter, Output } from '@angular/core';
import { itemModule } from '../item.module';

@Component({
  selector: 'app-item-drawer',
  standalone: true,
  imports: [itemModule],
  templateUrl: './item-drawer.html',
})
export class ItemDrawerComponent {
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  itemData = {
    title: '',
    description: ''
  };

  onSave() {
    this.save.emit(this.itemData);
  }

  onCancel() {
    this.close.emit();
  }
}
