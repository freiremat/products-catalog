import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book, BookClass } from '../../model/book';
import { BOOKS } from 'src/app/model/db-data';
import { BookListService } from '../../services/BookList.service';

@Component({
  selector: 'app-book-stock',
  templateUrl: './book-stock.component.html',
  styleUrls: ['./book-stock.component.scss']
})
export class BookStockComponent implements OnInit, OnDestroy {
  books: BookClass[] = BOOKS;
  subscription!: Subscription;
  selectedBook!: BookClass;
  showModal: boolean = false;


  constructor(private bkService: BookListService) { }

  ngOnInit() {
    this.books = this.bkService.getBooks();
    this.subscription = this.bkService.booksChanged.subscribe(
      (books: BookClass[]) => {
        this.books = books;
        console.log('Updated Books:', this.books);
      }
    );
  }

  onEditItem(bookId: number) {
    const book = this.books.find(b => b.id === bookId);

    if (book) {
      this.selectedBook = book; // Armazena o livro selecionado
      this.showModal = true;
    } else {
      console.error('Book not found for ID:', bookId);
    }
  }

  closeModal() {
    this.showModal = false;
  }

  updateBook(updatedBook: Book) {
    const index = this.books.findIndex(book => book.id === updatedBook.id);
    if (index !== -1) {
      this.books[index] = updatedBook; // Atualiza o livro no array
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
