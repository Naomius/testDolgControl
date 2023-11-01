import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { FilterComponent } from './components/filter/filter.component';
import { SortPipe } from './pipes/sort.pipe';
import { CountSelectorComponent } from './components/count-selector/count-selector.component';
import { BooksNotFoundComponent } from './components/books-not-found/books-not-found.component';
import { SortingPipe } from './pipes/sorting.pipe';
import { Page404Component } from './components/page404/page404.component';
import { PasswordRepeatDirective } from './directives/password-repeat.directive';



@NgModule({
    declarations: [
        FilterComponent,
        SortPipe,
        CountSelectorComponent,
        BooksNotFoundComponent,
        SortingPipe,
        Page404Component,
        PasswordRepeatDirective,
    ],
    exports: [
      FilterComponent,
      SortPipe,
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
