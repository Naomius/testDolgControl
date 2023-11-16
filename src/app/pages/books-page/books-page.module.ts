import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {BooksPageComponent} from "./books-page.component";
import {BooksComponent} from "../../features/books/books.component";
import {BooksModule} from "../../features/books/books.module";

const routes: Routes = [
  {path: 'books', component: BooksComponent},
];

@NgModule({
  declarations: [
    BooksPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BooksModule,
  ]
})
export class BooksPageModule { }
