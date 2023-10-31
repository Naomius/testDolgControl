import {BooksType} from "./books-type";

export class CartItem  {

  constructor(book: BooksType) {
    this.book = book;
  }

  book: BooksType;
  quantity: number = 1;

  get price(): number {
    return parseFloat(this.book.price) * this.quantity;
  }
}
