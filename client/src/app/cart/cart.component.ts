import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { HttpService } from './../http.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  // products:any = []
  allProducts:any

  constructor(private _httpService: HttpService) { }

  ngOnInit() {

    this._httpService.productInfo.subscribe((data) => {
      console.log('cart component', data);
      this.allProducts = data
      
    })

    // this._httpService.currentProduct.subscribe((products) => {
    //   console.log('3');
      
    //   console.log('products?', products);
    //   if(products.hasOwnProperty('name')) {
    //     // console.log('yes');
    //     this._httpService.addCart(products).subscribe((data) => {
    //       console.log('cart data come in', data)
    //       this.allCart()
    //     })
    //   } else {
    //     this.allCart()
    //   }
    // })

    
  }
  // allCart() {
  //   this._httpService.cart().subscribe((data) => {
  //     console.log('data come in', data)
  //     console.log('6');
      
  //     // if(!data['cart'].hasOwnProperty('name')) {
  //     //   this.allProducts = {}
  //     // } else {
  //       this.allProducts = data['cart']
  //       // console.log('change', this.allProducts.length);
  //     // }
  //   })
  // }
  onSubmitCart() {

  }
  deleteCart() {
    this._httpService.deleteCart().subscribe((data)=> {
      console.log('deleted', data)
      this._httpService.cart().subscribe((data)=> {
        console.log('hi', data);
        this.allProducts = data['cart']
      })
    })
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
