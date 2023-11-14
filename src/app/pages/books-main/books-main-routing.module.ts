import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BooksComponent} from "./books/books.component";
import {BookComponent} from "./book/book.component";

const routes: Routes = [
  {path: 'books', component: BooksComponent},
  {path: 'book', component: BookComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksMainRoutingModule { }
