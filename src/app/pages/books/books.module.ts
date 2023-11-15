import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books/books.component';
import {SharedModule} from "../../shared/shared.module";
import { BookComponent } from './book/book.component';
import {FormsModule} from "@angular/forms";
import {FilterComponent} from "./filter/filter.component";


@NgModule({
  declarations: [
    BooksComponent,
    BookComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class BooksModule { }
