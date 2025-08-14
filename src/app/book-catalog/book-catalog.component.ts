import { Component } from '@angular/core';
import { BOOKS } from 'src/app/model/db-data';
import { Book } from '../model/book';
import { BookListService } from '../services/BookList.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookCardComponent } from '../book/book-card/book-card.component';

@Component({
  selector: 'app-book-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, BookCardComponent],
  templateUrl: './book-catalog.component.html',
  styleUrls: ['./book-catalog.component.scss']
})
export class BookCatalogComponent {
  books: Book[] = [];
  filterText: string = '';

  constructor(private bkService: BookListService, private router: Router) { }

  ngOnInit() {
    this.books = this.bkService.getBooks(); // Obtendo os livros do serviço
  }

  filteredBooks() {
    if (!this.filterText) {
      return this.books; // Se não houver filtro, retorna todos os livros
    }

    return this.books.filter(book => {
      const titleMatch = book.description.toLowerCase().includes(this.filterText.toLowerCase());
      const categoryMatch = book.category.toLowerCase().includes(this.filterText.toLowerCase());
      const dateMatch = book.date.toLowerCase().includes(this.filterText.toLowerCase());
      return titleMatch || categoryMatch || dateMatch; // Retorna livros que correspondem ao título ou categoria ou data
    });
  }

  goToDetail(bookId: number) {
    this.router.navigate(['/book-catalog/detail', bookId]);
  }
}
