import { Injectable } from '@angular/core';
import {BookType} from "../../types/books-type";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  bookDataList: BookType[] = [];
  booksSubject$ = new BehaviorSubject<any>([]);

  constructor() {
  }

  getBookData() {
    return this.booksSubject$.asObservable();
  }

  addToCart(product:any) {
    this.bookDataList.push(product);
    this.booksSubject$.next(this.bookDataList);
    this.getTotalAmount();
  }
  //
  getTotalAmount() {
    let grandTotal = 0;
    this.bookDataList.map((a:any) => {
      grandTotal += a.total;
    })
  }

  removeCartData(product:any) {
    this.bookDataList.map((a:any, index: any) => {
      if (product.id === a.id) {
        this.bookDataList.splice(index, 1)
      }
    })
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
