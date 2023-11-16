import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatSortModule} from "@angular/material/sort";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatMenuModule} from "@angular/material/menu";
import {NgPipesModule} from "ngx-pipes";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
    declarations: [],
    exports: [
      MatSortModule,
      MatSnackBarModule,
      MatMenuModule,
      NgPipesModule,
      MatSortModule,
      MatTableModule,
      MatButtonModule
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterLink,
    ]
})
export class SharedModule { }
