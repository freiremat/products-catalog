import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { DividerModule } from 'primeng/divider';
import { Book } from 'src/app/model/book';
import { BookListService } from 'src/app/services/BookList.service';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, DividerModule, AccordionModule],
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent {
  bookId: number = 0;
  book: Book | null = null;

  constructor(public route: ActivatedRoute, private bkService: BookListService) { }

  ngOnInit() {
    // Captura o ID do livro da rota
    this.route.params.subscribe(params => {
      this.bookId = +params['id']; // O '+' converte para number
      this.loadBook();
    });
  }

  loadBook() {
    this.book = this.bkService.getBooks().find(book => book.id === this.bookId) || null;
  }
}
