import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { FilterComponent } from './components/filter/filter.component';
import { BooksNotFoundComponent } from './components/books-not-found/books-not-found.component';
import { Page404Component } from './components/page404/page404.component';
import { PasswordRepeatDirective } from './directives/password-repeat.directive';
import {MatSortModule} from "@angular/material/sort";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatMenuModule} from "@angular/material/menu";
import {NgPipesModule} from "ngx-pipes";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
    declarations: [
        FilterComponent,
        BooksNotFoundComponent,
        Page404Component,
        PasswordRepeatDirective,
    ],
    exports: [
      FilterComponent,
      BooksNotFoundComponent,
      Page404Component,
      PasswordRepeatDirective,
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
