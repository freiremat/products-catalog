import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Book, BookClass } from 'src/app/model/book';
import { BookListService } from 'src/app/services/BookList.service';

@Component({
  selector: 'app-book-order',
  templateUrl: './book-order.component.html',
  styleUrls: ['./book-order.component.scss']
})
export class BookOrderComponent {
  @ViewChild('f', { static: false }) slForm!: NgForm;
  subscription!: Subscription;
  editMode = false;
  editedItemIndex!: number;
  editedItem!: Book;
  value: string | undefined;

  constructor(private bkService: BookListService) { }

  ngOnInit() {
    this.subscription = this.bkService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.bkService.getBook(index);
          this.slForm.setValue({
            name: this.editedItem.category,
            amount: this.editedItem.date
          })
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;

    // Obter a lista atual de livros
    const books = this.bkService.getBooks();

    // Calcular o próximo ID
    const nextId = books.reduce((max, current) => Math.max(max, current.id), 0) + 1;

    const newBook = new BookClass(
      nextId,
      value.description,
      value.iconUrl,
      value.longDescription,
      value.category,
      value.date
    );

    if (this.editMode) {
      this.bkService.updateBook(this.editedItemIndex, newBook);
    } else {
      this.bkService.addBook(newBook);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}