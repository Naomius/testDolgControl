import { Injectable } from '@angular/core';
import {Book} from "../../types/books-type";
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public bookDataList: Book[] = [];
  private booksSubject$ = new BehaviorSubject<any>([]);
  public updateBooks$: Subject<void> = new Subject();

  constructor() {}

  getBookData() {
    return this.booksSubject$.asObservable();
  }

  addToCart(bookItem: Book) {
    const bookInCart = this.bookDataList.find(book => book.isbn13 === bookItem.isbn13);
    if (bookInCart) {
      (bookInCart.count as number)++;
    } else {
      bookItem.count = 1;
      this.bookDataList.push(bookItem)
    }
    this.updateBooks$.next();
    this.booksSubject$.next(this.bookDataList);
    // this.getTotalAmount();
  }
  //
  // getTotalAmount(): void {
  //   let grandTotal = 0;
  //   // this.bookDataList.map((book: Book) => {
  //   //   if (book.count) {
  //   //     return grandTotal += book.count;
  //   //   }
  //   // })
  // }

  removeCartData(bookItem: any) {
    const bookInCart = this.bookDataList.find(book => book.isbn13 === bookItem.isbn13);
    if (bookInCart && bookInCart.count) {
      bookInCart.count--;

      if (bookInCart.count === 0) {
        const bookIndexInCart = this.bookDataList.findIndex(book => book.isbn13 === bookItem.isbn13);
        this.bookDataList.splice(bookIndexInCart, 1);
      }
    }
    this.updateBooks$.next();
    this.booksSubject$.next(this.bookDataList)
  }

  removeAllBooksFromCart() {
    this.bookDataList = []
    this.booksSubject$.next(this.bookDataList)
  }

  getBook(): Book[] {
    return this.bookDataList
  }

}
