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
    console.log(this.newUser)
    this._httpService.create(this.newUser).subscribe((data:any)=> {
      console.log(data)
    })
  }

  // getUser() {
  //   this._httpService.getAll().subscribe((data:any) => {
  //     console.log(data);
      
  //   })
  // }
  // makeUser() {
  //   let tas = {
  //     'name': "Pappy",
  //     'isComplete': true
  //   }
  //   this._httpService.create(tas).subscribe((data:any)=> {
  //     console.log(data);
      
  //   })
  // }

}
