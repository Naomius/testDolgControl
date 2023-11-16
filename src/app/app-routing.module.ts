import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./core/guards/auth.guard";
import {AuthLoginGuard} from "./core/guards/auth-login.guard";
import {LayoutComponent} from "./layout/layout.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/main' },
      {
        path: '',
        loadChildren: () => import('./pages/main-page/main-page.module').then(m => m.MainPageModule)
      },
      {
        path: '',
        loadChildren: () => import('./pages/books-page/books-page.module').then(m => m.BooksPageModule), canActivate:[AuthGuard]
      },
      {
        path: '',
        loadChildren: () => import('./pages/book-page/book-page.module').then(m => m.BookPageModule), canActivate:[AuthGuard]
      },
      {
        path: '',
        loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule), canActivate:[AuthLoginGuard]
      }, {
        path: '',
        loadChildren: () => import('./pages/signup-page/signup-page.module').then(m => m.SignupPageModule), canActivate:[AuthLoginGuard]
      },
      {
        path: '',
        loadChildren: () => import('./pages/cart-page/cart-page.module').then(m => m.CartPageModule), canActivate:[AuthGuard]
      },
      {
        path: '**',
        loadChildren: () => import('./pages/not-found-page/not-found-page.module').then(m => m.NotFoundPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
