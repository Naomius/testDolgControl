import { Injectable } from '@angular/core';
import {BookType} from "../../types/books-type";
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  bookDataList: BookType[] = [];
  booksSubject$ = new BehaviorSubject<any>([]);
  updateBooks$: Subject<void> = new Subject();

  constructor() {
  }

  getBookData() {
    return this.booksSubject$.asObservable();
  }

  addToCart(bookItem: BookType) {
    const bookInCart = this.bookDataList.find(book => book.isbn13 === bookItem.isbn13);
    if (bookInCart) {
      (bookInCart.count as number)++;
    } else {
      bookItem.count = 1;
      this.bookDataList.push(bookItem)
    }
    this.updateBooks$.next();
    this.booksSubject$.next(this.bookDataList);
    this.getTotalAmount();
  }
  //
  getTotalAmount() {
    let grandTotal = 0;
    this.bookDataList.map((a:any) => {
     return  grandTotal += a.total;
    })
  }

  removeCartData(bookItem: any) {
    const bookInCart = this.bookDataList.find(book => book.isbn13 === bookItem.isbn13);
    if (bookInCart && bookInCart.count) {
      bookInCart.count--;

      if (bookInCart.count === 0) {
        const bookIndexInCart = this.bookDataList.findIndex(book => book.isbn13 === bookItem.isbn13);
        this.bookDataList.splice(bookIndexInCart, 1);
        console.log(this.bookDataList);
      }
    }
    this.updateBooks$.next();


    this.booksSubject$.next(this.bookDataList)
  }

  removeAllCart() {
    this.bookDataList = []
    this.booksSubject$.next(this.bookDataList)
  }

  getBook(): BookType[] {
    return this.bookDataList
  }

}
