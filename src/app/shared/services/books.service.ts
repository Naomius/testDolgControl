import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {find, map, Observable} from "rxjs";
import {BookType, JsonType} from "../../types/books-type";

@Injectable({
  providedIn: 'root'
})
export class BooksService{

  private bookss!: BookType[];

  constructor(private http: HttpClient) {
    this.getBooks()
      .pipe(
        map(result => result.books)
      )
      .subscribe(data => {
        this.bookss = data;
      })
  }

  getBooks(): Observable<JsonType> {
    return this.http.get<JsonType>('/assets/books.json')
  }

  getBookId(id: number): BookType | undefined {
    return this.bookss.find(item => (item.id === +id))
  }

  // getBookId(id: number): Observable<BookType> {
  //  return this.getBooks()
  //     .pipe(
  //       map(item => {
  //         return item.books.find(item => item.id === id)
  //       })
  //     )
  // }

   getPropByPath(object: any, path: string[]): any {
    return path.reduce((obj, propName) => obj[propName], object);
  }

}
