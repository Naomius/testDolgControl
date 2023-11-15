import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from "../../../types/books-type";
import {Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {BooksService} from "../../../services/books.service";
import {CartService} from "../../../services/cart.service";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit, OnDestroy{

  public book!: Book
  isLoading: boolean = false;
  destroy$ = new Subject();

  constructor(private router: Router,
              private bookService: BooksService,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getBook()
  }

  private getBook(): void {
      if (this.bookService.selectedBook) {
        this.book = this.bookService.selectedBook
        this.isLoading = false;
      } else {
        this.router.navigate(['/books'])
      }
  }

   prepareBooks(): void {
    const findBookInCart = this.cartService.booksList.find((bookInCart) => bookInCart.isbn13 === this.book.isbn13);
    if (findBookInCart) {
      this.book = findBookInCart;
    }
  }

  public addBookToCart(book:Book) {
    this.cartService.addToCart(book);
    this.prepareBooks();
  }

  public removeBookFromCart(book: Book) {
    this.cartService.removeFromCart(book);
    this.prepareBooks();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }


}
