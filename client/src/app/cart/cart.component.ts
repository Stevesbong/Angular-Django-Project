import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { HttpService } from './../http.service'
import { all } from 'q';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  // products:any = []
  allProducts:any
  // products:any
  subPrice:any = 0
  totalPrice:any = 0
  counter:any = {}
  testingProduct:any

  constructor(private _httpService: HttpService,
    private _router: Router) { }

  ngOnInit() {
    this._httpService.cart().subscribe((data:any)=> {
      if(data.cart || data.cart !=undefined) {
        data.cart.forEach((obj) => {
          this.counter[obj.name] = (this.counter[obj.name] || 0 ) +1
        })
        this.testingProduct = this.getUnique(data.cart, 'name')
        for(let i = 0; i < this.testingProduct.length; i++) {
          this.testingProduct[i].quantity = this.counter[this.testingProduct[i].name]
        }
        this.allProducts = this.testingProduct
        this.cartTotalSum(this.allProducts)
      }
    })
    
  }
  getUnique(arr, comp) {
    const unique = arr.map(e => e[comp])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter(e => arr[e]).map(e => arr[e]);
    return unique
  }
  cartTotalSum(data) {
    let sum = 0
    if(data) {
      for(let i = 0; i < data.length; i++) {
        sum += +(data[i].quantity * data[i].price)
      }
      this.totalPrice = sum
    }
    
  }

  onSubmitCart() {
    this._httpService.orderProcess(this.allProducts).subscribe((data:any) => {
    })
    this._router.navigate(['/order'])
  }
  deleteCart() {
    this._httpService.deleteCart().subscribe((data)=> {
      this._httpService.cart().subscribe((data)=> {
        this.allProducts = data['cart']
      })
    })
    this._httpService.cartLength.next(0)
  }
}
