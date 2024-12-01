import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookStockComponent } from './book-stock.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TableModule } from 'primeng/table';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book, BookClass } from 'src/app/model/book';
import { BookListService } from 'src/app/services/BookList.service';

@Injectable()
export class MockBookListService {
  startedEditing = new Subject<number>();
  public books: Book[] = [
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

describe('BookStockComponent', () => {
  let component: BookStockComponent;
  let fixture: ComponentFixture<BookStockComponent>;
  let bkService: MockBookListService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TableModule
      ],
      declarations: [BookStockComponent],
      providers: [
        { provide: BookListService, useClass: MockBookListService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BookStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    bkService = TestBed.inject(BookListService) as unknown as MockBookListService;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe from subscription on destroy', () => {
    const unsubscribeSpy = spyOn(component.subscription, 'unsubscribe').and.callThrough();

    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('expect to call method closeModal', () => {
    expect(component.showModal).toBeFalse();

    component.closeModal();

    expect(component.showModal).toBeFalse();
  });

  it('should update an existing book in the books array', () => {
    bkService.books = []; 
  
    const mockBook: Book = {
      id: 1,
      description: 'Updated Description',
      iconUrl: 'string',
      longDescription: 'string',
      category: 'string',
      date: '2012-09-12',
    };
  
    bkService.books.push(mockBook);
  
    const updatedBook: Book = {
      id: 1,
      description: 'Updated Description',
      iconUrl: 'string',
      longDescription: 'string',
      category: 'string',
      date: '2012-09-12',
    };
  
    component.updateBook(updatedBook);
  
    expect(bkService.books[0].description).toBe('Updated Description');
  });
});
