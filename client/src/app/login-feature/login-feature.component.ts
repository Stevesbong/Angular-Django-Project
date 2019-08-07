import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login-feature',
  templateUrl: './login-feature.component.html',
  styleUrls: ['./login-feature.component.css',
  '../register-feature/register-feature.component.css']
})
export class LoginFeatureComponent implements OnInit {

  loginUser:any
  errors:any = {}

  constructor(private _httpService:HttpService,
    private _router:Router) { }

  ngOnInit() {
    this.loginUser = {
      email:"",
      password:""
    }
  }

  onSubmit(){
    console.log('first consololog', this.loginUser);
    
    this._httpService.findUser(this.loginUser).subscribe((data:any)=> {
      console.log('from backend', data)
      if(!data.hasOwnProperty('errors')) {
        // temporary navigate.
        // later navigate it to success page
        // console.log('login component', data.user[0].id);
        // this._router.navigate(['/home', data.user[0].id])
        this._router.navigate(['/home'])
      } else {
        this.errors = data.errors
      }
    })
  }
  goHome() {
    this._router.navigate(['/'])
  }

  
}
