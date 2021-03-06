import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

// Import components
import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './containers';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ForgetPasswordComponent } from './views/login/forget-password/forget-password.component';
import { ResetComponent } from './views/login/reset/reset.component';


import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,

} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { YourInterceptor } from './services/token-intercepter.service';
import { ProfileServiceService } from './services/profile-service.service';
import { BookServiceService } from './services/book-service.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    ToasterModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ResetComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: YourInterceptor,
    multi: true
  }, {
    provide: LocationStrategy,
    useClass: HashLocationStrategy,

  },
    ToasterService,ProfileServiceService,BookServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
