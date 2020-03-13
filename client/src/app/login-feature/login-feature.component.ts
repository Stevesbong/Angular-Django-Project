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
    console.log('hi?');
    
    this._httpService.findUser(this.loginUser).subscribe((data:any)=> {
      if(!data.hasOwnProperty('errors')) {
        this._httpService.userInfo.next(data)
        this._router.navigate(['/'])
      } else {
        this.errors = data.errors
      }
    })
  }
  
}
