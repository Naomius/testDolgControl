import {Component, OnInit} from '@angular/core';
import {CartService} from "../../../shared/services/cart.service";
import {Book} from "../../../types/books-type";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public books!: Book[];
  // private allBooksCounter: number = 0;
  totalCountPrice: number = 0;

  constructor(private cartService: CartService) {
    this.setBook()
  }

  ngOnInit(): void {
    this.cartService.getBookData()
      .subscribe(result => {
        this.books = result;
      })
    this.totalBooksPrice()
  }

  public removeBook(item: Book) {
    this.cartService.removeCartData(item);
    this.totalBooksPrice()
  }

  // removeAllBooks() {
  //   this.cartService.removeAllCart();
  // }

   private totalBooksPrice() {
    let totalPrice: number = 0;
    this.books.forEach(item => {
      totalPrice += +item.price;
      return this.totalCountPrice = totalPrice;
    });
  }

    private setBook() {
       this.books = this.cartService.getBook();
    }
}
