import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../../model/book';
import { BookListService } from 'src/app/services/BookList.service';
import { CommonModule } from '@angular/common';
import { BookImageComponent } from '../book-image/book-image.component';

@Component({
  selector: 'app-book-card',
  standalone:true,
  imports: [CommonModule, BookImageComponent],
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
