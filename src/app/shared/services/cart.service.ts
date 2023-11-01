import { Injectable } from '@angular/core';
import {Cart} from "../../types/Cart";
import {BookType} from "../../types/books-type";
import {CartItem} from "../../types/CartItem";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Cart = new Cart();
  booksSubject$ = new BehaviorSubject<any>([]);

  addToCart(book: BookType): void {
    let cartItem = this.cart.items.find(item => item.book.id === book.id);
    if (cartItem) {
      this.changeQuantity(book.id, cartItem.quantity + 1);
      this.booksSubject$.next(cartItem)
      return;
    }
    this.cart.items.push(new CartItem(book))
    this.booksSubject$.next(book)
  }

  removeFromCart(bookId: number): void {
    this.cart.items =
    this.cart.items.filter(item => item.book.id != bookId);
  }

  changeQuantity(bookId: number, quantity: number) {
    let cartItem = this.cart.items.find(item => item.book.id === bookId);
      if (!cartItem) return;
      cartItem.quantity = quantity;
  }

  getCart(): Cart {
    return this.cart;
  }

  //Иной вариант реализации

  // getProductData() {
  //   return this.booksSubject$.asObservable();
  // }
  //
  // setProduct(product:any) {
  //   this.cart.items.push(...product);
  // }
  //
  // addToCart2(product:any) {
  //   this.cart.items.push(product);
  //   this.booksSubject$.next(this.cart.items);
  //   this.getTotalAmount();
  // }
  //
  // getTotalAmount() {
  //   let grandTotal = 0;
  //   this.cart.items.map((a:any) => {
  //     grandTotal += a.total;
  //   })
  // }
  //
  // removeCartData(product:any) {
  //   this.cart.items.map((a:any, index: any) => {
  //     if (product.id === a.id) {
  //       this.cart.items.splice(index, 1)
  //     }
  //   })
  // }
  //
  // removeAllCart() {
  //   this.cart.items = []
  //   this.booksSubject$.next(this.cart.items)
  // }

}
