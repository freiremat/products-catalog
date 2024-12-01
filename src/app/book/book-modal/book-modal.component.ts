import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book, BookClass } from 'src/app/model/book';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.scss']
})
export class BookModalComponent {
  @Input() book!: BookClass;
  @Output() closeModal = new EventEmitter<void>();
  @Output() bookUpdated = new EventEmitter<Book>();

  onSubmit() {
    this.bookUpdated.emit(this.book);
  }

  close() {
    this.closeModal.emit();
  }
}
