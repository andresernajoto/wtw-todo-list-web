import { Routes } from '@angular/router';

export const appRoutes: Routes = [
   {
    path: 'listas',
    loadChildren: () => import('../app/features/list/list.routing')
  },
  {
    path: '',
    redirectTo: 'listas',
    pathMatch: 'full'
  }
];
