import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service'
import { Router } from '@angular/router'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  oneUser:any = {}
  cartItem:number
  constructor(private _httpService:HttpService,
    private _router:Router) {

  }

  ngOnInit() {
    this._httpService.cart().subscribe((data)=> {
      this._httpService.productInfo.next(data['cart'])
      if(data['cart']) {
        this._httpService.cartLength.next(data['cart'].length)
      }
    })
    this._httpService.cartLength.subscribe(cartNum=> {
      this.cartItem = cartNum
    })
    this._httpService.logInUser()
    this._httpService.userInfo.subscribe((data:any) => {
      if(data != undefined){
        this.oneUser = data.user
      }
    })
  }

  logOut() {
    this.oneUser = ""
    this._httpService.logOutUser().subscribe((data:any) => {
      if(data) {
        this._router.navigate(['/'])
      }
    })
    this._router.navigate(['/'])
  }
}
