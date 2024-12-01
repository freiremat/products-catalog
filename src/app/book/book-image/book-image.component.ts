import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'book-image',
  templateUrl: './book-image.component.html',
  styleUrls: ['./book-image.component.scss'],
})
export class BookImageComponent implements OnInit {

  @Input('src')
  imageUrl!: string;

  constructor() { }

  ngOnInit() {
  }
}
