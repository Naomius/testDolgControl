import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupPageComponent } from './signup-page.component';
import {RouterModule, Routes} from "@angular/router";
import {SignupModule} from "../../features/signup/signup.module";
import {SignupComponent} from "../../features/signup/signup.component";

const routes: Routes = [
  {path: 'signup', component: SignupComponent}
];

@NgModule({
  declarations: [
    SignupPageComponent
  ],
  imports: [
    CommonModule,
    SignupModule,
    RouterModule.forChild(routes),
  ]
})
export class SignupPageModule { }
