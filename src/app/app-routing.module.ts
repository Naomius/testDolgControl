import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./shared/layout/layout.component";
import {AuthLoginGuard} from "./core/auth-login.guard";
import {AuthGuard} from "./core/auth.guard";
import {Page404Component} from "./shared/components/page404/page404.component";

const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', loadChildren: () => import('./views/main/main.module').then(m => m.MainModule)},
      {path: '', loadChildren: () => import('./views/books-main/books-main.module').then(m => m.BooksMainModule), canActivate:[AuthGuard]},
      {path: '', loadChildren: () => import('./views/user/user.module').then(m => m.UserModule), canActivate:[AuthLoginGuard]},
      {path: '', loadChildren: () => import('./views/order/order.module').then(m => m.OrderModule), canActivate:[AuthGuard]}
    ]
  },
  {path: '**', component: Page404Component},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
