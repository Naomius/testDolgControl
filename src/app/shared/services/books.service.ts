import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {BooksType, JsonType} from "../../types/books-type";

@Injectable({
  providedIn: 'root'
})
export class BooksService{

  private bookss!: BooksType[];

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

  getBookId(id: number): BooksType | undefined {
    return this.bookss.find(item => (item.id === +id))
  }

  getBooks2(): Observable<BooksType[]> {
    return this.http.get<JsonType>('/assets/books.json').pipe(map(item => item.books))
  }

   getPropByPath(object: any, path: string[]): any {
    return path.reduce((obj, propName) => obj[propName], object);
  }

  // getBookId(id: number): JsonType | undefined {
  //   return this.getBooks().find(item => item.id == id)
  // }



}
