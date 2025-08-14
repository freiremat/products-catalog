import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Book, BookClass } from 'src/app/model/book';

@Component({
  selector: 'app-book-modal',
  standalone: true,
  imports: [ButtonModule, FormsModule, CommonModule],
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
