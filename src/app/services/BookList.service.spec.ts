import { TestBed } from '@angular/core/testing';
import { Book, BookClass } from '../model/book';
import { BOOKS } from 'src/app/model/db-data';
import { BookListService } from './BookList.service';

describe('BookListService', () => {
    let service: BookListService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(BookListService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return a list of books', () => {
        const books = service.getBooks();

        expect(books.length).toBe(BOOKS.length);
    });

    it('should return a specific book by index', () => {
        const book = service.getBook(0);

        expect(book).toEqual(BOOKS[0]);
    });

    it('should return a book by id', () => {
        const bookId = BOOKS[0].id;
        const book = service.getBookById(bookId);

        expect(book).toEqual(BOOKS[0]);
    });

    // it('should add a new book', () => {
    //     const newBook: BookClass = {
    //         id: 2,
    //         description: 'string',
    //         iconUrl: 'string',
    //         longDescription: 'string',
    //         category: 'string',
    //         date: '2012-09-12',
    //     };

    //     const books = service.getBooks();

    //     service.addBook(newBook);

    //     expect(books.length).toBe(BOOKS.length + 1);
    //     expect(books[BOOKS.length]).toEqual(newBook);
    // });

    // it('should update an existing book', () => {
    //     const updatedBook: Book = {
    //         id: 1,
    //         description: 'string',
    //         iconUrl: 'string',
    //         longDescription: 'string',
    //         category: 'string',
    //         date: '2012-09-12',
    //     };
    //     const book = service.getBook(1);

    //     service.updateBook(1, updatedBook);
        
    //     expect(book).toEqual(updatedBook);
    // });

    // it('should delete a book', () => {
    //     const books = service.getBooks();

    //     service.deleteBook(0);

    //     expect(books.length).toBe(BOOKS.length - 1);
    //     expect(books.find(book => book.id === BOOKS[0].id)).toBeUndefined();
    // });
});