import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login-feature',
  templateUrl: './login-feature.component.html',
  styleUrls: ['./../register-feature/register-feature.component.css']
})
export class LoginFeatureComponent implements OnInit {

  loginUser:any

  constructor(private _httpService:HttpService,
    private _router:Router) { }

  ngOnInit() {
    this.loginUser = {
      email:"",
      password:""
    }
  }

  
}
