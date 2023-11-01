import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookType} from "../../../types/books-type";
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
  books: BookType[] = [];
  booksCopy: BookType[] = [];
  searchString = '';
  error = '';
  isLoading = false;
  booksSub!: Subscription;

  orderBy: "asc" | "desc" = "asc";

  constructor(private booksService: BooksService,
              private cartService: CartService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getBooks();
  }

  addToCart() {
    // let cartItem = this.books.find(item => item.id );
    // this.cartService.addToCart(this.books);
    // this.cartService.booksSubject$.next(this.books)
  }

  getBooks(): void {
    this.isLoading = true;
    this.booksSub = this.booksService.getBooks()
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
      this.books = this.booksCopy.filter(book => book.title.toLocaleLowerCase().includes(str.toLowerCase())) ||
        this.booksCopy.filter(book => book.subtitle.toLocaleLowerCase().includes(str.toLowerCase()))
    } else {
      this.cleanInput();
    }
  }

  cleanInput(): void {
    this.searchString = '';
    this.books = this.booksCopy;
  }


  ngOnDestroy(): void {
    if (this.booksSub) {
      this.booksSub?.unsubscribe();
    }
  }

}
