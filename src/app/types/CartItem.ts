import {BookType} from "./books-type";

export class CartItem  {

  constructor(book: BookType) {
    this.book = book;
  }

  book: BookType;
  quantity: number = 1;

  get price(): number {
    return parseFloat(this.book.price) * this.quantity;
  }
}
