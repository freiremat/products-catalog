import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../../model/book';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit {

  @Input()
  book: Book = {} as Book;


  @Input()
  cardIndex!: number;

  @Output('bookChanged')
  bookEmitter = new EventEmitter<Book>();

  @Output() bookClicked = new EventEmitter<number>();

  ngOnInit() { }

  onTitleChanged(newTitle: string) {
    this.book.description = newTitle;
  }

  onSaveClicked(description: string) {
    this.bookEmitter.emit({ ...this.book, description });
  }

  onCardClick() {
    this.bookClicked.emit(this.book.id);
  }
}
