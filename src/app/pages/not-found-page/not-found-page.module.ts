import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {Page404Component} from "../../features/page404/page404.component";
import {NotFoundPageComponent} from "./not-found-page.component";
import {Page404Module} from "../../features/page404/page404.module";

const routes: Routes = [
  {path: '', component: Page404Component}
];

@NgModule({
  declarations: [
    NotFoundPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Page404Module
  ]
})
export class NotFoundPageModule { }
