import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {HeaderModule} from "./header/header.module";




@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    SharedModule,
    HeaderModule,
  ],
  exports: [
    HeaderModule
  ]
})
export class LayoutModule { }
