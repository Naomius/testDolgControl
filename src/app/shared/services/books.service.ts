import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable} from "rxjs";
import { JsonType} from "../../types/books-type";

@Injectable({
  providedIn: 'root'
})
export class BooksService{

  constructor(private http: HttpClient) {
  }

  getBooks(): Observable<JsonType> {
    return this.http.get<JsonType>('/assets/books.json')
  }

}
