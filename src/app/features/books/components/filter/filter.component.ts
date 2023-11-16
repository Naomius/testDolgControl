import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  @Input() searchString!: string;
  @Output() onFilterBooks: EventEmitter<string> = new EventEmitter<string>();
  @Output() onCleanInput: EventEmitter<void> = new EventEmitter<void>();

  filterBooks(): void {
    this.onFilterBooks.emit(this.searchString);
  }

  cleanInput(): void {
    this.searchString = '';
    this.onCleanInput.emit();
  }

}
