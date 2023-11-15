import { Injectable } from '@angular/core';
import {Book} from "../types/books-type";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public booksList: Book[] = [];

  addToCart(bookItem: Book): void {
    const bookInCart = this.booksList.find(book => book.isbn13 === bookItem.isbn13);
    if (bookInCart) {
      (bookInCart.count as number)++;
    } else {
      bookItem.count = 1;
      this.booksList.push(bookItem)
    }
  }

  removeFromCart(bookItem: Book): void {
    const bookInCart = this.booksList.find(book => book.isbn13 === bookItem.isbn13);
    if (bookInCart && bookInCart.count) {
      bookInCart.count--;

      if (bookInCart.count === 0) {
        const bookIndexInCart = this.booksList.findIndex(book => book.isbn13 === bookItem.isbn13);
        this.booksList.splice(bookIndexInCart, 1);
      }
    }
  }

  getTotalAmount(): number {
    let grandTotal = 0;
    this.booksList.forEach((book: Book) => {
      if (book.count) {
        grandTotal += book.count;
      }
    })
    return grandTotal;
  }

  getTotalPrice(): number {
    let totalPrice: number = 0;
    this.booksList.forEach(book => {
      totalPrice += book.count ? +book.price * book.count : +book.price;
    });
    return totalPrice
  }

  removeAllBooksFromCart(): void {
    this.booksList = []
  }
}
