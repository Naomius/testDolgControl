import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { FilterComponent } from './components/filter/filter.component';
import { SortPipe } from './pipes/sort.pipe';



@NgModule({
    declarations: [
        FilterComponent,
        SortPipe
    ],
    exports: [
        FilterComponent,
        SortPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterLink
    ]
})
export class SharedModule { }
