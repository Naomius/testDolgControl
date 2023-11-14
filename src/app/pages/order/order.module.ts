import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { CartComponent } from './cart/cart.component';
import {SharedModule} from "../../shared/shared.module";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    CartComponent
  ],
    imports: [
        SharedModule,
        CommonModule,
        OrderRoutingModule,
        MatButtonModule
    ]
})
export class OrderModule { }
