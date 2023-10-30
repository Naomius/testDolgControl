import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./shared/layout/layout.component";
import {AuthLoginGuard} from "./core/auth-login.guard";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', loadChildren: () => import('./views/main/main.module').then(m => m.MainModule)},
      {path: '', loadChildren: () => import('./views/books-main/books-main.module').then(m => m.BooksMainModule)},
      {path: '', loadChildren: () => import('./views/user/user.module').then(m => m.UserModule), canActivate:[AuthLoginGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
