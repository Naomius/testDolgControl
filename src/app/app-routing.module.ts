import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Page404Component} from "./shared/components/page404/page404.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {AuthLoginGuard} from "./core/guards/auth-login.guard";
import {LayoutComponent} from "./layout/layout.component";

const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)
      },
      {
        path: '',
        loadChildren: () => import('./pages/books-main/books-main.module').then(m => m.BooksMainModule), canActivate:[AuthGuard]
      },
      {
        path: '',
        loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule), canActivate:[AuthLoginGuard]
      },
      {
        path: '',
        loadChildren: () => import('./pages/order/order.module').then(m => m.OrderModule), canActivate:[AuthGuard]
      }
    ]
  },
  {path: '**', component: Page404Component},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
