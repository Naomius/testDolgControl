import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BookComponent} from "./book.component";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    BookComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterLink,
  ],
  exports: [
    BookComponent
  ]
})
export class BookModule { }
