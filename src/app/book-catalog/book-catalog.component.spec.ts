import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookCatalogComponent } from './book-catalog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BookListService } from '../services/BookList.service';
import { Book, BookClass } from '../model/book';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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

describe('BookCatalogComponent', () => {
  let component: BookCatalogComponent;
  let fixture: ComponentFixture<BookCatalogComponent>;
  let bkService: MockBookListService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [BookCatalogComponent],
      providers: [
        { provide: BookListService, useClass: MockBookListService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BookCatalogComponent);
    component = fixture.componentInstance;
    bkService = TestBed.inject(BookListService) as unknown as MockBookListService;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getBooks on ngOnInit and populate books', () => {
    spyOn(bkService, 'getBooks').and.callThrough();

    component.ngOnInit();

    expect(bkService.getBooks).toHaveBeenCalled();
    expect(component.books).toEqual(bkService.getBooks());
  });
  
  it('should filter books based on filterText', () => {

    component.ngOnInit();
    component.filterText = 'Book 1';

    const filtered = component.filteredBooks();

    expect(filtered.length).toBe(1);
    expect(filtered[0].description).toBe('Book 1');
  });

  it('should navigate to detail page on goToDetail', () => {
    const routerSpy = spyOn(component['router'], 'navigate').and.stub();

    component.goToDetail(1);

    expect(routerSpy).toHaveBeenCalledWith(['/book-catalog/detail', 1]);
  });
});