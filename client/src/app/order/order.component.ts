import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css',
  '../register-feature/register-feature.component.css']
})
export class OrderComponent implements OnInit {
  
  allProducts:any
  totalPrice:any = {}
  counter:any = {}
  sessionId:any
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.loadStripe()
    this._httpService.currentProduct.subscribe((data:any) => {
      if(data.cart) {
        data.cart.forEach((obj) => {
          this.counter[obj.name] = (this.counter[obj.name] || 0) +1
        })
        this.allProducts = this.getUnique(data.cart, 'name');
        for(let i = 0; i < this.allProducts.length; i++) {
          this.allProducts[i].quantity = this.counter[this.allProducts[i].name]
        }
        this.totalSum(this.allProducts)
      }
    })
  }
  getUnique(arr, comp) {
    const unique = arr.map(e => e[comp])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter(e => arr[e]).map(e => arr[e]);
    return unique
  }

  deleteOrder() {
    this._httpService.deleteOrder().subscribe((data:any) => {
      this.allProducts = data.order
    })
  }
  totalSum(data) {
    let sum = 0
    if(data) {
      for(let i = 0; i < data.length; i++) {
        sum += +(data[i].quantity * data[i].price)
      }
      this.totalPrice.subTotal = sum * 0.072
      this.totalPrice.total = sum + this.totalPrice.subTotal
    }
    
  }
  checkoutSubmit() {
    this._httpService.checkout(this.allProducts, this.totalPrice).subscribe((data:any) => {
      this.sessionId = data.session.id
    })
  }
  loadStripe() {
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      window.document.body.appendChild(s);
    }
  }
  pay(a) {
    console.log('totla', a);
    var amount= Math.round(a * 100) / 100
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_I1GKO8q7IcCNvng7yGSMOWJr007FRNBIba',
      locale:'auto',
      token:function(token:any) {
        console.log('token', token);
        alert('Token Created!!');
      }
    })
    handler.open({
      name:"Steve's E-commerce",
      description: '2 widgets',
      amount: amount * 100
    })
    console.log('totla2', amount);
  }
  
}