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
  products:any
  subPrice:any = 0
  totalPrice:any = 0
  counter:any = {}
  testingProduct:any

  constructor(private _httpService: HttpService,
    private _router: Router) { }

  ngOnInit() {

    // this._httpService.productInfo.subscribe((data) => {
    //   console.log('cart component check', data);
    //   this.allProducts = data
    // })
    // this.cartSum()
    this._httpService.cart().subscribe((data:any)=> {
      // for(let i = 0; i < data.cart.length; i++) {
      //   console.log('test for loop', i);
      // }
      if(data.cart || data.cart !=undefined) {
        data.cart.forEach((obj) => {
          console.log('test for each', obj.name);
          this.counter[obj.name] = (this.counter[obj.name] || 0 ) +1
        })
        console.log('counter test', this.counter);
        console.log(data.cart);
        this.products = data.cart
        console.log('unique test', this.getUnique(data.cart, 'name'));
        this.testingProduct = this.getUnique(data.cart, 'name')
        for(let i = 0; i < this.testingProduct.length; i++) {
          console.log('test', this.counter[this.testingProduct[i].name]);
          this.testingProduct[i].quantity = this.counter[this.testingProduct[i].name]
        }
        this.allProducts = this.testingProduct
        this.cartTotalSum(this.allProducts)
        console.log('from cart component test all product', this.allProducts);
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
    console.log('\n\n\n***************************\n');
    console.log(' something console log here\n');
    console.log('***************************\n\n\n');    
    let sum = 0
    if(data) {
      console.log('from cart component data exists?', data);
      for(let i = 0; i < data.length; i++) {
        sum += +(data[i].quantity * data[i].price)
      }
      this.totalPrice = sum
    }
    
  }

  onSubmitCart() {
    console.log('productsssss', this.products);
    
    this._httpService.orderProcess(this.products).subscribe((data:any) => {
      // console.log('what is it?', data);
      
    })
    // this.deleteCart()
    this._router.navigate(['/order'])
  }
  deleteCart() {
    this._httpService.deleteCart().subscribe((data)=> {
      console.log('deleted', data)
      this._httpService.cart().subscribe((data)=> {
        console.log('hi', data);
        this.allProducts = data['cart']
      })
    })
    this._httpService.cartLength.next(0)
  }
}
