import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './http.service';
import { LoginFeatureComponent } from './login-feature/login-feature.component';
import { RegisterFeatureComponent } from './register-feature/register-feature.component';
import { HomeComponent } from './home/home.component'
import {NgxPaginationModule} from 'ngx-pagination';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFeatureComponent,
    RegisterFeatureComponent,
    HomeComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
