import {Component, OnInit} from '@angular/core';
import {CartService} from "../../../shared/services/cart.service";
import {BookType} from "../../../types/books-type";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  books!: BookType[];
  allBooksCounter: any = 0;
  totalCountPrice: number = 0;

  constructor(private cartService: CartService) {
    this.setBook()
  }

  ngOnInit(): void {
    this.cartService.getBookData()
      .subscribe(result => {
        this.books = result;
        this.allBooksCounter = this.cartService.getTotalAmount()
      })
    this.totalPrice()
  }

  removeBook(item: BookType) {
    this.cartService.removeCartData(item);
    this.totalPrice()
  }

  removeAllBooks() {
    this.cartService.removeAllCart();
  }

   totalPrice() {
    let totalPrice: number = 0;
    this.books.forEach(item => {
      totalPrice += +item.price;
      return this.totalCountPrice = totalPrice;
    });
  }

    setBook() {
       this.books = this.cartService.getBook();
    }
}
