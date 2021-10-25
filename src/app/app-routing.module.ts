import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { AuthGuardGuard } from './auth-guard.guard';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { RedirectAuthenticatedGuard } from './redirect-authenticated.guard';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { ForgetPasswordComponent } from './views/login/forget-password/forget-password.component';
import { LoginComponent } from './views/login/login.component';
import { ResetComponent } from './views/login/reset/reset.component';
import { RegisterComponent } from './views/register/register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,canActivate :[RedirectAuthenticatedGuard],
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'login/forget',
    component: ForgetPasswordComponent,canActivate :[RedirectAuthenticatedGuard],
    data: {
      title: 'ForgetPassword Page'
    }
  },
  {
    path: 'login/resetpassword',canActivate :[RedirectAuthenticatedGuard],
    component: ResetComponent,
    data: {
      title: 'resetPassword Page'
    }
  },
  {
    path: 'login/resetpassword/:resetLink',canActivate :[RedirectAuthenticatedGuard],
    component: ResetComponent,
    data: {
      title: 'resetPassword Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,canActivate :[RedirectAuthenticatedGuard],
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '', canActivate: [AuthGuardGuard],
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
  
  
      {
        path: 'dashboard' ,canActivate : [AdminGuard],
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      },

      { path: 'profile', loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule) },
      { path: 'edit', loadChildren: () => import('./views/edit/edit.module').then(m => m.EditModule) },
      { path: 'library', loadChildren: () => import('./views/library/library.module').then(m => m.LibraryModule) },
      { path: 'Review/:idd', loadChildren: () => import('./views/bookreview/bookreview.module').then(m => m.BookreviewModule) },
      { path: 'editBook/:id', loadChildren: () => import('./views/edit-book/edit-book.module').then(m => m.EditBookModule) },
      { path: 'userProfile/:id', loadChildren: () => import('./views/prfile-for-others/prfile-for-others.module').then(m => m.PrfileForOthersModule) },
      { path: 'library/romance', loadChildren: () => import('./views/categories/romance/romance.module').then(m => m.RomanceModule) },
      { path: 'library/detective', loadChildren: () => import('./views/categories/detective/detective.module').then(m => m.DetectiveModule) },
      { path: 'library/fantasy', loadChildren: () => import('./views/categories/fantasy/fantasy.module').then(m => m.FantasyModule) },
      { path: 'library/Horror', loadChildren: () => import('./views/categories/horror/horror.module').then(m => m.HorrorModule) },
      { path: 'library/sc-fi', loadChildren: () => import('./views/categories/sc-fi/sc-fi.module').then(m => m.ScFiModule) },
      { path: 'library/Drama', loadChildren: () => import('./views/categories/drama/drama.module').then(m => m.DramaModule) },
      { path: 'library/Others', loadChildren: () => import('./views/categories/others/others.module').then(m => m.OthersModule) },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
