import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {BooksType, JsonType} from "../../types/books-type";

@Injectable({
  providedIn: 'root'
})
export class BooksService{

  private bookss!: JsonType[];

  constructor(private http: HttpClient) {
    this.getBooks()
      .pipe(
        map(result => result.books)
      )
      .subscribe(data => {
        this.bookss = data;
      })
  }

  getBooks(): Observable<BooksType> {
    return this.http.get<BooksType>('/assets/books.json')
  }

  getBook(id: number): Observable<JsonType> {
    return this.http.get<JsonType>(`/assets/books.json/books/id/${id}`)
  }

  getBookId(id: number): JsonType | undefined {
    return this.bookss.find(item => (item.id === +id))
  }

}
