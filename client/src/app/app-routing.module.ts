import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFeatureComponent } from './login-feature/login-feature.component'
import { RegisterFeatureComponent } from './register-feature/register-feature.component'
import { HomeComponent } from './home/home.component'
import { ProductComponent } from './product/product.component'
import { ProductViewComponent } from './product-view/product-view.component'
import { ProductEditComponent } from './product-edit/product-edit.component'
import { ShopComponent } from './shop/shop.component'
import { ShopProductComponent } from './shop-product/shop-product.component'
import { CartComponent } from './cart/cart.component'


const routes: Routes = [
  { path: '', redirectTo:'/home', pathMatch:'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'shop', component: ShopComponent, children: [
    { path: '', component: ShopProductComponent}
  ] },
  { path: 'login', component: LoginFeatureComponent },
  { path: 'register', component: RegisterFeatureComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product/:id', component: ProductViewComponent },
  { path: 'product/:id/edit', component: ProductEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
