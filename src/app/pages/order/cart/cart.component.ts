import {Component, OnInit} from '@angular/core';
import {Book} from "../../../types/books-type";
import {CartService} from "../../../services/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
  }

   removeBook(book: Book) {
    this.cartService.removeFromCart(book);
  }

  addBookToCart(book: Book) {
    this.cartService.addToCart(book)
  }
}
