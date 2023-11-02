import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookType} from "../../../types/books-type";
import {BooksService} from "../../../shared/services/books.service";
import {map, Subscription} from "rxjs";
import {CartService} from "../../../shared/services/cart.service";
import {Sort} from "@angular/material/sort";

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
              private cartService: CartService) {
    this.sortedData = this.books.slice();
  }

  ngOnInit(): void {
    this.getBooks();

    this.cartService.updateBooks$.subscribe(() => {
      this.prepareBooks();
    })
  }

  //Сортировка
  sortedData: BookType[];

  sortData(sort: Sort) {
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


  prepareBooks(): void {
    this.booksCopy.forEach((book) => {
      const findBookInCart = this.cartService.bookDataList.find((bookInCart) => bookInCart.isbn13 === book.isbn13);
      if (findBookInCart) {
        book.count = findBookInCart.count;
      } else {
        book.count = null;
      }
    });
    this.books = this.booksCopy;
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
          this.prepareBooks();
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

  removeBook(book: BookType) {
    this.cartService.removeCartData(book)
  }


  ngOnDestroy(): void {
    if (this.booksSub) {
      this.booksSub?.unsubscribe();
    }
  }

}
