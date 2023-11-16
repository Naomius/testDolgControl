import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {EmptyCartComponent} from "./components/emptyCart/empty-cart.component";
import {CartComponent} from "./cart.component";
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [
    CartComponent,
    EmptyCartComponent
  ],
  exports: [
    CartComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterLink
  ]
})
export class CartModule {
}
