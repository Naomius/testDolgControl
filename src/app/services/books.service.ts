import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book, Json} from "../types/books-type";

@Injectable({
  providedIn: 'root'
})
export class BooksService{

  public selectedBook!: Book;

  constructor(private http: HttpClient) {
  }

  public getBooks(): Observable<Json> {
    return this.http.get<Json>('/assets/books.json')
  }

}
