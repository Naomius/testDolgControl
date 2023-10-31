import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { CartComponent } from './cart/cart.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
