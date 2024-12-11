import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import("./pages/login/login.component").then(x => x.LoginComponent)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(x => x.AdminModule)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
