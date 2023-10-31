import {Component, OnDestroy, OnInit} from '@angular/core';
import {BooksType} from "../../../types/books-type";
import {BooksService} from "../../../shared/services/books.service";
import {BehaviorSubject, combineLatest, map, Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {CartService} from "../../../shared/services/cart.service";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy{
  books: BooksType[] = [];
  booksCopy: BooksType[] = [];
  searchString = '';
  error = '';
  isLoading = false;
  newsBooksSub!: Subscription;

  private _ascDirection = 1;
  private _sortCriteria$ = new BehaviorSubject<string>('');

  constructor(private booksService: BooksService,
              private cartService: CartService,
              private router: Router) {
  }


  // Cортировка
  books$: Observable<any> = combineLatest(
    this.booksService.getBooks2(),
    this._sortCriteria$
  )
    .pipe(
      map(([books, criteria]) => {
        return [...books.sort((aBook, bBook) => {
          const path = criteria.split('.');
          const aPropValue = this.booksService.getPropByPath(aBook, path);
          const bPropValue = this.booksService.getPropByPath(bBook, path);

          const less = -1 * this._ascDirection;
          const more = 1 * this._ascDirection;

          if (typeof aPropValue === 'string') {
            return aPropValue.toLowerCase() <= bPropValue.toLowerCase() ? less : more;
          } else {
            return aPropValue <= bPropValue ? less : more;
          }
        })]
      })
    )

  sortBy(criteria: string): void {
    if (criteria === this._sortCriteria$.getValue()) {
      this._ascDirection *= -1;
    } else {
      this._ascDirection = 1;
    }
    this._sortCriteria$.next(criteria);
  }

  ngOnInit(): void {
    this.getPosts();
  }

  addToCart() {
    // let cartItem = this.books.find(item => item.id );
    // this.cartService.addToCart(this.books);
    // this.cartService.booksSubject$.next(this.books)
  }

  getPosts(): void {
    this.isLoading = true;
    this.newsBooksSub = this.booksService.getBooks()
      .pipe(
        map(result => result.books)
      )
      .subscribe({
        next: (books) => {
          this.books = this.booksCopy = books;
          this.isLoading = false;
        },
        error: (error) => {
          this.error = error.message;
          this.isLoading = false;
        }
      })
  }

  filterBooks(str: string): void {
    if (str.trim()) {
      this.searchString = str;
      this.books = this.booksCopy.filter(news => news.title.toLocaleLowerCase().includes(str.toLowerCase()));
    } else {
      this.cleanInput();
    }
  }

  cleanInput(): void {
    this.searchString = '';
    this.books = this.booksCopy;
  }


  ngOnDestroy(): void {
    if (this.newsBooksSub) {
      this.newsBooksSub?.unsubscribe();
    }
  }





}
