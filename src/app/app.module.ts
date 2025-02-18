import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookCardComponent } from './book/book-card/book-card.component';
import { BookImageComponent } from './book/book-image/book-image.component';
import { HeaderComponent } from './header/header.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookStockComponent } from './book/book-stock/book-stock.component';
import { BookOrderComponent } from './book/book-order/book-order.component';
import { BookCatalogComponent } from './book-catalog/book-catalog.component';
import { BookListService } from './services/BookList.service';
import { HttpClientModule } from '@angular/common/http';
import { BookModalComponent } from './book/book-modal/book-modal.component';
import { BookDetailComponent } from './book-catalog/book-detail/book-detail.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from 'src/authGuard';

//primeng modules
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import { CardModule } from 'primeng/card';
import { MenuItem } from 'primeng/api';

import { ToggleButtonModule } from 'primeng/togglebutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AccordionModule, AccordionTab } from 'primeng/accordion';


@NgModule({
  declarations: [
    AppComponent,
    BookCardComponent,
    BookImageComponent,
    HeaderComponent,
    BookStockComponent,
    BookCatalogComponent,
    BookOrderComponent,
    BookModalComponent,
    BookDetailComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    MenubarModule,
    DialogModule,
    FormsModule,
    TableModule,
    TagModule,
    RatingModule,
    HttpClientModule,
    InputTextModule,
    DividerModule,
    FieldsetModule,
    CardModule,
    AppRoutingModule,
    SelectButtonModule,
    OverlayPanelModule,
    ReactiveFormsModule,
    ToggleButtonModule,
    AccordionModule,
    

        
  ],
  providers: [BookListService, AuthService, AuthGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
