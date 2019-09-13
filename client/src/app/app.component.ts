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
    // this.getOneUser()
    this._httpService.cart().subscribe((data)=> {
      this._httpService.productInfo.next(data['cart'])
      if(data['cart']) {
        this._httpService.cartLength.next(data['cart'].length)
      }
    })
    this._httpService.cartLength.subscribe(cartNum=> {
      // console.log('hhhh', cartNum);
      this.cartItem = cartNum
    })
    // this._httpService.userInfo.subscribe((data:any) => {
    //   console.log('userinof', data);
    //   this.oneUser = data
      
    // })
    this._httpService.logInUser()
    this._httpService.userInfo.subscribe((data:any) => {
      // console.log('userinfo', data);
      if(data != undefined){
        // console.log('lllllllllll');
        this.oneUser = data.user
        
      }
      
    })

    
    // need to put eventEmitter?
  }

  // getOneUser() {
  //   this._httpService.logInUser().subscribe((data:any) => {
  //     // console.log('logInUser', data, data.id);
  //     if(data.id){
  //       // console.log('check id', data.id);
  //       this._httpService.loggedInUser(data.id).subscribe((data:any) => {
  //         // console.log('data from loggedInUser', data.user[0]);
  //         this.oneUser = data.user[0]
  //       })
  //     } else {
  //       // console.log('error');
  //       // this._router.navigate(['/'])
  //     }
  //   })
  // }



  logOut() {
    this.oneUser = ""
    this._httpService.logOutUser().subscribe((data:any) => {
      // console.log(data)
      if(data) {
        // console.log('hello');
        this._router.navigate(['/'])
        // console.log('another hello');
      }
    })
    console.log('user logout');
    this._router.navigate(['/'])
  }
}
