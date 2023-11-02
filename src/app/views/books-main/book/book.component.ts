import {Component, OnInit} from '@angular/core';
import {BookType} from "../../../types/books-type";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BooksService} from "../../../shared/services/books.service";
import {CartService} from "../../../shared/services/cart.service";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit{

  book!: BookType;
  isLoading: boolean = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private _snakeBar: MatSnackBar,
              private bookService: BooksService,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getBook()

    this.cartService.updateBooks$.subscribe(() => {
      this.prepareBooks();
    })
  }

  getBook() {
    this.book = history.state
    this.prepareBooks()
  }

  prepareBooks(): void {
      const findBookInCart = this.cartService.bookDataList.find((bookInCart) => bookInCart.isbn13 === this.book.isbn13);
      if (findBookInCart) {
        this.book.count = findBookInCart.count;
      } else {
        this.book.count = null;
      }
  }

  addToCart(book:BookType) {
    this.cartService.addToCart(book);
    this.router.navigate(['/cart'])
  }

  removeBook(book: BookType) {
    this.cartService.removeCartData(book)
  }


}
