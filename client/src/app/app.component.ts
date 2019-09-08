import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service'
import { Router } from '@angular/router'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  oneUser:any
  constructor(private _httpService:HttpService,
    private _router:Router) {

  }

  ngOnInit() {
    this.getOneUser()
  }
  getOneUser() {
    this._httpService.logInUser().subscribe((data:any) => {
      console.log('logInUser', data, data.id);
      if(data.id){
        console.log('check id', data.id);
        this._httpService.loggedInUser(data.id).subscribe((data:any) => {
          console.log('data from loggedInUser', data.user[0]);
          this.oneUser = data.user[0]
        })
      } else {
        console.log('error');
        // this._router.navigate(['/'])
      }
    })
  }



  logOut() {
    this.oneUser = ""
    this._httpService.logOutUser().subscribe((data:any) => {
      console.log(data)
      if(data) {
        console.log('hello');
        this._router.navigate(['/'])
        console.log('another hello');
      }
    })
    console.log('user logout');
    this._router.navigate(['/'])
  }
}
