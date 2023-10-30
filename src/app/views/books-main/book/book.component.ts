import {Component, OnDestroy, OnInit} from '@angular/core';
import {JsonType} from "../../../types/books-type";
import {map, Subscription, switchMap, tap} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BooksService} from "../../../shared/services/books.service";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit, OnDestroy{

  // book: JsonType = {} as JsonType;
  bookProd!: JsonType;
  private subscription: Subscription | null = null;
  isLoading: boolean = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private _snakeBar: MatSnackBar,
              private bookService: BooksService) {
  }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params
      .pipe(
        tap(data => console.log(data))
      )
      .subscribe((params) => {
        if (params['id']) {
          const book = this.bookService.getBookId(+params['id']);
           if (book) {
             this.bookProd = book;
           }
        }
      })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
