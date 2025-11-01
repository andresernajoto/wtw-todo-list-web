import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item-drawer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './item-drawer.html',
})
export class ItemDrawerComponent implements OnInit {
  @Input() listId?: number = 0;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  itemData = {
    name: '',
    description: '',
    dueDate: '',
  };

  minDate: string = '';
  hasDateError: boolean = false;

  ngOnInit(): void {
    this.setMinDate();
  }

  onSave() {
    this.validateDate();

    if (this.isFormValid()) {
      const itemToSave = {
        ...this.itemData,
        dueDate: this.formatDueDate(this.itemData.dueDate),
        listId: this.listId
      };

      this.save.emit(itemToSave);
      this.resetForm();
    }
  }

  onCancel() {
    this.resetForm();
    this.close.emit();
  }

  validateDate() {
    if (!this.itemData.dueDate) {
      this.hasDateError = false;

      return;
    }

    const selectedDate = new Date(this.itemData.dueDate);
    const today = new Date();    
    
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    
    const isValid = !isNaN(selectedDate.getTime()) && selectedDate >= today;
    this.hasDateError = !isValid;
  }

  private setMinDate() {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  private isFormValid(): boolean {
    return (
      this.itemData.name.trim().length > 0 &&
      this.itemData.name.length <= 50 &&
      this.itemData.description.length <= 256 &&
      this.isValidDate()
    );
  }

  private isValidDate(): boolean {
    if (!this.itemData.dueDate) return true;

    const selectedDate = new Date(this.itemData.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return selectedDate >= today;
  }

  private formatDueDate(dateString: string): string {
    if (!dateString) return '';

    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  private resetForm() {
    this.itemData = {
      name: '',
      description: '',
      dueDate: '',
    };
  }
}
