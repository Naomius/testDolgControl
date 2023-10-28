import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksMainRoutingModule } from './books-main-routing.module';
import { BooksComponent } from './books/books.component';


@NgModule({
  declarations: [
    BooksComponent
  ],
  imports: [
    CommonModule,
    BooksMainRoutingModule
  ]
})
export class BooksMainModule { }
