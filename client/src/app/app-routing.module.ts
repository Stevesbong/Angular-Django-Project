import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFeatureComponent } from './login-feature/login-feature.component'
import { RegisterFeatureComponent } from './register-feature/register-feature.component'
import { HomeComponent } from './home/home.component'


const routes: Routes = [
  { path: '', redirectTo:'/home/1', pathMatch:'full' },
  { path: 'home/:id', component: HomeComponent },
  { path: 'login', component: LoginFeatureComponent },
  { path: 'register', component: RegisterFeatureComponent }
  // { path: 'success', component: }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
