import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookOrderComponent } from './book-order.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Book, BookClass } from 'src/app/model/book';
import { BookListService } from 'src/app/services/BookList.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonModule } from 'primeng/button';


@Injectable()
export class MockBookListService {
  startedEditing = new Subject<number>();
  private books: Book[] = [
    new BookClass(1, 'Book 1', 'url-do-icon', 'Long description 1', 'Category 1', '20/09/1999'),
    new BookClass(2, 'Book 2', 'url-do-icon', 'Long description 2', 'Category 2', '21/09/1999')
  ];
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

describe('BookOrderComponent', () => {
  let component: BookOrderComponent;
  let fixture: ComponentFixture<BookOrderComponent>;
  let bkService: MockBookListService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ButtonModule
      ],
      declarations: [BookOrderComponent],
      providers: [
        { provide: BookListService, useClass: MockBookListService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BookOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe from subscription on destroy', () => {
    const unsubscribeSpy = spyOn(component.subscription, 'unsubscribe').and.callThrough();

    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('expect to call method onClear', () => {

    component.slForm = jasmine.createSpyObj('NgForm', ['reset']);
    component.editMode = true;

    component.onClear();

    expect(component.slForm.reset).toHaveBeenCalled();
    expect(component.editMode).toBe(false);
  });
});
