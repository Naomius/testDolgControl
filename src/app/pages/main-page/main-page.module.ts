import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainPageComponent} from "./main-page.component";
import {RouterModule, Routes} from "@angular/router";
import {MainModule} from "../../features/main/main.module";

const routes: Routes = [
  {path: 'main', component: MainPageComponent}
];

@NgModule({
  declarations: [
    MainPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MainModule,
  ]
})
export class MainPageModule { }
