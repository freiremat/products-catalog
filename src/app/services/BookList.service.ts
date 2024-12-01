import { Injectable } from '@angular/core';
import { Book, BookClass } from '../model/book';
import { Subject } from 'rxjs';
import { BOOKS } from 'src/app/model/db-data';

@Injectable({ 
  providedIn: 'root'
})
export class BookListService {
  startedEditing = new Subject<number>();
  private books: Book[] = BOOKS
  booksChanged = new Subject<Book[]>();

  getBooks() {
    return this.books.slice();
  }

  getBook(index: number) {
    return this.books[index];
  }

  getBookById(id: number): Book | undefined {
    return this.books.find(book => book.id === id);
  }

  addBook(book: BookClass) {
    this.books.push(book);
    this.booksChanged.next(this.books.slice());
  }

  addBooks(books: Book[]) {
    this.books.push(...books);
    this.booksChanged.next(this.books.slice());
  }

  updateBook(index: number, newBook: Book) {
    this.books[index] = newBook;
    this.booksChanged.next(this.books.slice());
  }

  deleteBook(index: number) {
    this.books.splice(index, 1);
    this.booksChanged.next(this.books.slice());
  }
}
