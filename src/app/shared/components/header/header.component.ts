import {Component, OnInit} from '@angular/core';
import {UserLoginType} from "../../../types/userLogin-type";
import {AuthService} from "../../../core/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  authUser!: UserLoginType | null;

  constructor(private authService: AuthService,
              private _snakeBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
    this.authService.authUser$.subscribe((authUser) => {
      this.authUser = authUser;
    })
  }

  doLogout(): void {
    this._snakeBar.open('Вы вышли из системы');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
