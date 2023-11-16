import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginPageComponent} from "./login-page.component";
import {LoginModule} from "../../features/login/login.module";
import {LoginComponent} from "../../features/login/login.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LoginModule
  ]
})
export class LoginPageModule { }
