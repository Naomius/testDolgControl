import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from "../../../types/books-type";
import {map, Subject, takeUntil} from "rxjs";
import {Sort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {CartService} from "../../../services/cart.service";
import {BooksService} from "../../../services/books.service";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {

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
  }

  ngOnInit(): void {
    this.getBooks();
  }

  public selectBook(book: Book) {
    this.booksService.selectedBook = book;
    this.router.navigate(['/book'])
  }

  private prepareBooks(): void {
    this.books.forEach((book) => {
      const findBookInCart = this.cartService.booksList.find((bookInCart) => bookInCart.isbn13 === book.isbn13);
      if (findBookInCart) {
        book.count = findBookInCart.count;
      } else {
        book.count = null;
      }
    });
  }

  public addBookToCart(book: Book) {
    this.cartService.addToCart(book)
    this.prepareBooks();
  }

  public removeBookFromCart(book: Book) {
    this.cartService.removeFromCart(book);
    this.prepareBooks();
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



  //Сортировка

  sortBooks(sort: Sort): void {
    console.log(sort)
    const data = this.books.slice();
    if (!sort.active || sort.direction === '') {
      this.books = this.booksCopy;
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
