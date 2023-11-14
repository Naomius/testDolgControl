import { Component, OnDestroy, OnInit } from '@angular/core';
import {Book} from "../../../types/books-type";
import {BooksService} from "../../../shared/services/books.service";
import {map, Subject, takeUntil} from "rxjs";
import {CartService} from "../../../shared/services/cart.service";
import {Sort} from "@angular/material/sort";
import {Router} from "@angular/router";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy{

  public books: Book[] = [];
  private booksCopy: Book[] = [];
  public searchString = '';
  public error = '';
  public isLoading = false;
  private destroy$ = new Subject();

  displayedColumns: string[] = ['position', 'image', 'name', 'price', 'description', 'buy'];


  constructor(private booksService: BooksService,
              private cartService: CartService,
              private router: Router) {
    this.sortedData = this.books.slice();
  }

  ngOnInit(): void {
    this.getBooks();
    this.cartService.updateBooks$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
      this.prepareBooks();
    })
  }

  public selectedBook(book: Book) {
    this.booksService.singleBook = book;
    this.router.navigate(['/book'])
  }


  private prepareBooks(): void {
    this.books.forEach((book) => {
      const findBookInCart = this.cartService.bookDataList.find((bookInCart) => bookInCart.isbn13 === book.isbn13);
      if (findBookInCart) {
        book.count = findBookInCart.count;
      } else {
        book.count = null;
      }
    });
    // this.books = this.booksCopy;
  }

  public addBookToCart(book: Book) {
    this.cartService.addToCart(book)
  }

  private getBooks(): void {
    this.isLoading = true;
    this.booksService.getBooks()
      .pipe(
        takeUntil(this.destroy$),
        map(result => result.books)
      )
      .subscribe({
        next: (books) => {
          this.books = this.booksCopy = books;
          this.prepareBooks();
          this.isLoading = false;
        },
        error: (error) => {
          this.error = error.message;
          this.isLoading = false;
        }
      })
  }

  //Фильтр
  public filterBooks(str: string): void {
    if (str.trim()) {
      this.searchString = str;
      this.books = this.booksCopy.filter(book => book.title.toLocaleLowerCase().includes(str.toLowerCase()) ||
         book.subtitle.toLocaleLowerCase().includes(str.toLowerCase()))
    } else {
      this.cleanSearchInput();
    }
  }


  public cleanSearchInput(): void {
    this.searchString = '';
    this.books = this.booksCopy;
  }

  public removeBookFromCart(book: Book) {
    this.cartService.removeCartData(book)
  }

  //Сортировка
  sortedData: Book[];

  sortBooks(sort: Sort) {
    const data = this.books.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.books = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title':
          return this.compare(a.title, b.title, isAsc);
        case 'price':
          return this.compare(a.price, b.price, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }


}
