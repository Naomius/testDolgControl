import {Component, OnInit} from '@angular/core';
import {CartService} from "../../../shared/services/cart.service";
import {Cart} from "../../../types/Cart";
import {CartItem} from "../../../types/CartItem";
import {BooksService} from "../../../shared/services/books.service";
import {map} from "rxjs";
import {BooksType, JsonType} from "../../../types/books-type";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{

  cart!: Cart;
  books!: BooksType[];

  constructor(private cartService: CartService,
              private booksService: BooksService) {
    this.booksService.getBooks()
      .pipe(
        map(result => result.books)
      )
      .subscribe(data => {
        this.books = data;
      })

    this.setCart();
  }

  ngOnInit(): void {
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.book.id);
    this.setCart();
  }

  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.book.id, quantity);
    this.setCart();
  }

  setCart() {
    this.cart = this.cartService.getCart();
  }

}
