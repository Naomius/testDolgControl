import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from "../../../types/books-type";
import {Router} from "@angular/router";
import {BooksService} from "../../../shared/services/books.service";
import {CartService} from "../../../shared/services/cart.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit, OnDestroy{

  public book!: Book
  private isLoading: boolean = false;
  destroy$ = new Subject();

  constructor(private router: Router,
              private bookService: BooksService,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getBook()
    // this.cartService.updateBooks$.pipe(
    //   takeUntil(this.destroy$)
    // ).subscribe(() => {
    //   // this.prepareBooks();
    // })
  }

  private getBook() {
      if (!this.bookService.singleBook) {
        this.router.navigate(['/books'])
      }
        this.book = this.bookService.singleBook
  }

  //  prepareBooks(): void {
  //     const findBookInCart = this.cartService.bookDataList.find((bookInCart) => bookInCart.isbn13 === this.book.isbn13);
  //     if (findBookInCart) {
  //       this.book.count = findBookInCart.count;
  //     } else {
  //       this.book.count = null;
  //     }
  // }

  public addBookToCart(book:Book) {
    this.cartService.addToCart(book);
  }

  public removeBookFromCart(book: Book) {
    this.cartService.removeCartData(book)
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }


}
