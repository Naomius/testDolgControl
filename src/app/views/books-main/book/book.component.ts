import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookType} from "../../../types/books-type";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BooksService} from "../../../shared/services/books.service";
import {CartService} from "../../../shared/services/cart.service";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit, OnDestroy{

  book!: BookType;

  private subscription: Subscription | null = null;
  isLoading: boolean = false;
  isInCart: boolean = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private _snakeBar: MatSnackBar,
              private bookService: BooksService,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.book = history.state
  }

  addToCart() {
    this.cartService.addToCart(this.book);
    this.isInCart = true;
    this.cartService.booksSubject$.next(this.book)
    this.router.navigate(['/cart'])
  }

  removeFromCart() {
    this.cartService.removeCartData(this.book.id)
    this.isInCart = false;
    this.cartService.booksSubject$.next(this.book.id)
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
