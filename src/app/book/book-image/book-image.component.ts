import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'book-image',
  standalone: true,
  templateUrl: './book-image.component.html',
  styleUrls: ['./book-image.component.scss'],
})
export class BookImageComponent {

  @Input('src')
  imageUrl!: string;

}
