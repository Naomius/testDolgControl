import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { FilterComponent } from './components/filter/filter.component';
import { CountSelectorComponent } from './components/count-selector/count-selector.component';
import { BooksNotFoundComponent } from './components/books-not-found/books-not-found.component';
import { Page404Component } from './components/page404/page404.component';
import { PasswordRepeatDirective } from './directives/password-repeat.directive';



@NgModule({
    declarations: [
        FilterComponent,
        CountSelectorComponent,
        BooksNotFoundComponent,
        Page404Component,
        PasswordRepeatDirective,
    ],
    exports: [
      FilterComponent,
      CountSelectorComponent,
      BooksNotFoundComponent,
      Page404Component,
      PasswordRepeatDirective
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterLink,
    ]
})
export class SharedModule { }
