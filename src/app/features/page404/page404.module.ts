import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Page404Component} from "./page404.component";
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [
    Page404Component
  ],
  exports: [
    Page404Component
  ],
  imports: [
    CommonModule,
    RouterLink,
  ]
})
export class Page404Module { }
