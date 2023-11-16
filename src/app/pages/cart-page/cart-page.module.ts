import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartPageComponent } from './cart-page.component';
import {RouterModule, Routes} from "@angular/router";
import {CartComponent} from "../../features/cart/cart.component";
import {CartModule} from "../../features/cart/cart.module";

const routes: Routes = [
  {path: 'cart', component: CartComponent}
];

@NgModule({
  declarations: [
    CartPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CartModule
  ]
})
export class CartPageModule { }
