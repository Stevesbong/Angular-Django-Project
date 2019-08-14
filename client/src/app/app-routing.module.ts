import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFeatureComponent } from './login-feature/login-feature.component'
import { RegisterFeatureComponent } from './register-feature/register-feature.component'
import { HomeComponent } from './home/home.component'
import { ProductComponent } from './product/product.component'
import { ProductViewComponent } from './product-view/product-view.component'
import { ProductEditComponent } from './product-edit/product-edit.component'


const routes: Routes = [
  { path: '', redirectTo:'/home', pathMatch:'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginFeatureComponent },
  { path: 'register', component: RegisterFeatureComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product/:id', component: ProductViewComponent },
  { path: 'product/edit/:id', component: ProductEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
