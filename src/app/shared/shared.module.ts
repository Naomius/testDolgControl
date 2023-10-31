import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { FilterComponent } from './components/filter/filter.component';
import { SortPipe } from './pipes/sort.pipe';
import { CountSelectorComponent } from './components/count-selector/count-selector.component';
import { BooksNotFoundComponent } from './components/books-not-found/books-not-found.component';



@NgModule({
    declarations: [
        FilterComponent,
        SortPipe,
        CountSelectorComponent,
        BooksNotFoundComponent,
    ],
    exports: [
      FilterComponent,
      SortPipe,
      CountSelectorComponent,
      BooksNotFoundComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterLink,
    ]
})
export class SharedModule { }
