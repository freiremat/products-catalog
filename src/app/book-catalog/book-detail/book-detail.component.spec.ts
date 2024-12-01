import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookDetailComponent } from './book-detail.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Book, BookClass } from 'src/app/model/book';
import { BookListService } from 'src/app/services/BookList.service';

let activatedRouteStub: Partial<ActivatedRoute>;

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

describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;
  let route: ActivatedRoute;
  let bkService: MockBookListService;

  beforeEach(async () => {
    activatedRouteStub = {};

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [BookDetailComponent],
      providers: [
        { provide: BookListService, useClass: MockBookListService },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;
    route = TestBed.get(ActivatedRoute);
    bkService = TestBed.inject(BookListService) as unknown as MockBookListService;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expect to call onInit', () => {

    const mockParams = { id: 1 };

    spyOn(component, 'loadBook').and.callThrough();

    component.route.params = of(mockParams)
    component.ngOnInit();

    expect(component.book).toEqual(bkService.getBookById(1) || null);
    expect(component.loadBook).toHaveBeenCalled();
  });

  it('should load the correct book', () => {
    component.bookId = 1;

    component.loadBook();

    expect(component.book).toEqual(bkService.getBookById(1) || null);
  });
});
