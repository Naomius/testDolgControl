import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookType} from "../../../types/books-type";
import {BooksService} from "../../../shared/services/books.service";
import {map, Subscription} from "rxjs";
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


  constructor(private booksService: BooksService,
              private cartService: CartService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getBooks();
    this.books.forEach((book: BookType) => {
      Object.assign(book, {quantity: 1, total: book.price})
    });
  }

  addToCart(book: BookType) {
    this.cartService.addToCart(book)
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

  removeBook(book:any) {
    this.cartService.removeCartData(book)
  }


  ngOnDestroy(): void {
    if (this.booksSub) {
      this.booksSub?.unsubscribe();
    }
  }

}
