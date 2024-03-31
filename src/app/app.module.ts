import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CustomersComponent } from './components/customers/customers.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationInterceptor } from './security/authentication.interceptor';
import { HomeComponent } from './components/home/home.component';
import { TodoComponent } from './components/todo/todo.component';
import { NgToastModule } from 'ng-angular-popup';
import { NgHttpLoaderModule } from 'ng-http-loader';




@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    ProductsComponent,
    OrdersComponent,
    CustomersComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    TodoComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgToastModule,
    NgHttpLoaderModule.forRoot()


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
