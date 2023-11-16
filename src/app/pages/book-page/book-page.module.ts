import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {BookPageComponent} from "./book-page.component";
import {BookModule} from "../../features/book/book.module";
import {BookComponent} from "../../features/book/book.component";

const routes: Routes = [
  {path: 'book', component: BookComponent}
];

@NgModule({
  declarations: [
    BookPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BookModule
  ]
})
export class BookPageModule { }
