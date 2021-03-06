import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-register-feature',
  templateUrl: './register-feature.component.html',
  styleUrls: ['./register-feature.component.css']
})
export class RegisterFeatureComponent implements OnInit {

  newUser:any
  errors:any = {}

  constructor(private _httpService: HttpService,
    private _router:Router) { }

  ngOnInit() {
    this.newUser = {
      first_name:"",
      last_name:"",
      email:"",
      password:"",
      confirm_password:""
    }
  }
  onSubmit() {
    this._httpService.create(this.newUser).subscribe((data:any)=> {
      if(!data.hasOwnProperty('errors')) {
        this._router.navigate(['/login'])
      } else {
        this.errors = data.errors
      }
    })
  }

  getUser() {
    this._httpService.getAll().subscribe((data:any) => {
    })
  }
}
