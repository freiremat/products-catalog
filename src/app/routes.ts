import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookStockComponent } from './book/book-stock/book-stock.component';
import { BookCatalogComponent } from './book-catalog/book-catalog.component';
import { BookOrderComponent } from './book/book-order/book-order.component';
import { BookDetailComponent } from './book-catalog/book-detail/book-detail.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from 'src/authGuard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'book-catalog',
    component: BookCatalogComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
  },
  { path: 'book-catalog/detail/:id', component: BookDetailComponent },

  {
    path: 'book-stock',
    component: BookStockComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'seller', 'client'] }
  },
  {
    path: 'book-order',
    component: BookOrderComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'seller'] }
  },
];