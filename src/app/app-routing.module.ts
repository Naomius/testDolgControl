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
      {
        path: '',
        redirectTo: '/main',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)
      },
      {
        path: '',
        loadChildren: () => import('./pages/books/books.module').then(m => m.BooksModule), canActivate:[AuthGuard]
      },
      {
        path: '',
        loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule), canActivate:[AuthLoginGuard]
      },
      {
        path: '',
        loadChildren: () => import('./pages/order/order.module').then(m => m.OrderModule), canActivate:[AuthGuard]
      },
      {
        path: '**',
        loadChildren: () => import('./pages/page404/page404.module').then(m => m.Page404Module)//todo создать модуль 404 в pages и роутинг
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
