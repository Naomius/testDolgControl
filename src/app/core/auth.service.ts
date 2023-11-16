import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {UserLogin} from "../types/userLogin";

export const USERS_KEY = 'users';
export const USER_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUser$: BehaviorSubject<UserLogin | null> = new BehaviorSubject<UserLogin | null>(null)

  constructor() {
    const user = localStorage.getItem(USER_KEY);
      if (user) {
        this.authUser$.next(JSON.parse(user))
      }
  }

  login(user: UserLogin): void {
    this.authUser$.next(user);
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  signup(user: UserLogin): void {
    const users = localStorage.getItem(USERS_KEY);
    const usersList: UserLogin[] = users ? JSON.parse(users) : [];
    usersList.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(usersList));
    this.login(user)
  }

  logout(): void {
    this.authUser$.next(null);
    localStorage.removeItem(USER_KEY);
  }

  userIsAuthorized(): boolean {
    return !!this.authUser$.value
  }
}
