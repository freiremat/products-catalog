import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../../model/book';
import { BookListService } from 'src/app/services/BookList.service';

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

  constructor(private bookListService: BookListService) { }

  ngOnInit() {
    this.bookListService.booksChanged.subscribe((books: Book[]) => {
      this.book = books[this.cardIndex];
    });
  }

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
