import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserLoginType} from "../../types/userLogin-type";
import {CartService} from "../../shared/services/cart.service";
import {AuthService} from "../../core/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  authUser!: UserLoginType | null;
  booksCounter: number = 0;

  constructor(private authService: AuthService,
              private _snakeBar: MatSnackBar,
              private router: Router,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.authService.authUser$.subscribe((authUser) => {
      this.authUser = authUser;
    })

    this.cartService.getBookData()
      .subscribe(result => {
        this.booksCounter = result.length;
      })
  }

  doLogout(): void {
    this._snakeBar.open('Вы вышли из системы');
    this.authService.logout();
    this.cartService.removeAllBooksFromCart();
    this.router.navigate(['/login']);
  }
}
