import { Component, OnInit } from '@angular/core';
// import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Book Catalog',
        routerLink: 'book-catalog',
        icon: 'pi pi-book'
      },
      {
        label: 'Stock',
        routerLink: 'book-stock',
        icon: 'pi pi-warehouse'
      },
      {
        label: 'Order',
        routerLink: 'book-order',
        icon: 'pi pi-cart-plus'
      },
      {
        label: 'Sign Out',
        routerLink: 'login',
        icon: 'pi pi-sign-out',
      },
    ]
  }
}