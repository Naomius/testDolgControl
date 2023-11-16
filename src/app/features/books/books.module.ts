import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {BooksComponent} from "./books.component";
import {FilterComponent} from "./components/filter/filter.component";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    BooksComponent,
    FilterComponent
  ],
  exports: [
    BooksComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
  ]
})
export class BooksModule { }
