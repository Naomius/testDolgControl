import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-books-not-found',
  templateUrl: './books-not-found.component.html',
  styleUrls: ['./books-not-found.component.scss']
})
export class BooksNotFoundComponent {

  @Input() visible: boolean = false;
  @Input() notFoundMessage: string = "Nothing Found!";
  @Input() resetLinkText: string = "Reset";
  @Input() resetLinkRoute: string = "/";

}
