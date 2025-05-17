import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo: 'auth/sign-in',
  },
  {
    path:'auth/sign-in',
    loadChildren:() => import('./modules/auth/sign-in/sign-in.module') .then(m => m.SignInModule),
  },
  {
    path:'general',
    loadChildren:() => import('./modules/general/general.module') .then(m => m.GeneralModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
