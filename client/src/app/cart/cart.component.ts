import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { HttpService } from './../http.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
  }
  onSubmitCart() {

  }

    //example
  // onSubmit() {
  //   console.log(this.newUser)
  //   this._httpService.create(this.newUser).subscribe((data:any)=> {
  //     console.log(data)
  //     if(!data.hasOwnProperty('errors')) {
  //       this._router.navigate(['/login'])
  //     } else {
  //       this.errors = data.errors
  //     }
  //   })
  // }

}
