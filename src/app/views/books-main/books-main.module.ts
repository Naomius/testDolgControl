import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksMainRoutingModule } from './books-main-routing.module';
import { BooksComponent } from './books/books.component';
import {SharedModule} from "../../shared/shared.module";
import { BookComponent } from './book/book.component';
import {FormsModule} from "@angular/forms";
import {OrderModule} from "ngx-order-pipe";


@NgModule({
  declarations: [
    BooksComponent,
    BookComponent
  ],
  imports: [
    CommonModule,
    BooksMainRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class BooksMainModule { }
