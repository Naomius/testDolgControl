import {Component, OnDestroy, OnInit} from '@angular/core';
import {JsonType} from "../../../types/books-type";
import {BooksService} from "../../../shared/services/books.service";
import {map, Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy{
  books!: JsonType[];
  booksCopy: JsonType[] = [];

  searchString = '';
  error = '';
  SortbyParam = '';
  SortDirection = 'asc';

  isSortingOpen = false;
  sortingOptions: {name: string, value: string}[] = [
    {name: 'От А до Я', value: 'az-asc'},
    {name: 'От Я до А', value: 'az-desc'},
    {name: 'По возрастанию цены', value: 'price-asc'},
    {name: 'По убыванию цены', value: 'price-desc'},
  ]

  isLoading = false;
  newsBooksSub!: Subscription;

  constructor(private booksService: BooksService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getPosts();
  }

  onSortDirection() {
    if (this.SortDirection === 'desc') {
      this.SortDirection = 'asc'
    } else {
      this.SortDirection = 'desc'
    }
  }

  getPosts(): void {
    this.isLoading = true;
    this.newsBooksSub = this.booksService.getBooks()
      .pipe(
        map(result => result.books)
      )
      .subscribe({
        next: (books) => {
          console.log(books)
          this.books = this.booksCopy = books;
          this.isLoading = false;
        },
        error: (error) => {
          this.error = error.message;
          this.isLoading = false;
        }
      })
  }

  filterBooks(str: string): void {
    if (str.trim()) {
      this.searchString = str;
      this.books = this.booksCopy.filter(news => news.title.toLocaleLowerCase().includes(str.toLowerCase()));
    } else {
      this.cleanInput();
    }
  }

  cleanInput(): void {
    this.searchString = '';
    this.books = this.booksCopy;
  }

  toggleSorting() {
    this.isSortingOpen = !this.isSortingOpen;
  }

  ngOnDestroy(): void {
    if (this.newsBooksSub) {
      this.newsBooksSub?.unsubscribe();
    }
  }





}
