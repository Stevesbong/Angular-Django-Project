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
  products:any
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    // this._httpService.getUserOrder().subscribe((data:any) => {
    //   console.log('data come', data);
    //   this.allProducts = data.order
    //   if(data.order) {
    //     data.order.forEach((obj) => {
    //       this.counter[obj.name] = (this.counter[obj.name] || 0) +1
    //     })
    //     console.log('counter test', this.counter);
    //     this.allProducts = this.getUnique(data.order, 'name')
    //     console.log('data after unique', this.allProducts);
        
    //     for(let i = 0; i< this.allProducts.length; i++) {
    //       console.log('test', this.counter[this.allProducts[i].name]);
    //       this.allProducts[i].quantity = this.counter[this.allProducts[i].name]
    //     }
    //     this.totalSum(this.allProducts)
    //   }  
    //   if(this.allProducts != undefined || this.allProducts != []) {
    //     console.log('coming?');
    //     this._httpService.cart().subscribe((data:any) => {

    //       // console.log('ashofasd',data.cart);
    //       if(data.cart != undefined) {
    //         // console.log('hi');
            
    //         this._httpService.deleteCart().subscribe((data:any) => {
    //             // console.log('deleted cart', data);
    //             this._httpService.productInfo.next(data.cart)
    //             this._httpService.cartLength.next(0)
    //           })
    //       }
    //     })
    //   }
      
    // })
    // this._httpService.cart().subscribe((data:any) => {
    //   console.log('data come order component', data);
    //   this.allProducts = data.cart
    //   if(data.cart) {
    //     data.cart.forEach((obj) => {
    //       this.counter[obj.name] = (this.counter[obj.name] || 0) +1
    //     })
    //     this.allProducts = this.getUnique(data.cart, 'name');
    //     for(let i = 0; i < this.allProducts.length; i++) {
    //       this.allProducts[i].quantity = this.counter[this.allProducts[i].name]
    //     }
    //     this.totalSum(this.allProducts)

    //   }
    //   if(this.allProducts != undefined || this.allProducts != [] ) {
    //     this._httpService.cart().subscribe((data:any) => {
    //       if(data.cart != undefined) {
    //         this._httpService.deleteCart().subscribe((data:any) => {
    //           this._httpService.productInfo.next(data.cart)
    //           this._httpService.cartLength.next(0)
    //         })
    //       }
    //     })
    //   }
    //   this.products = this.allProducts
    //   console.log('test is working?',  this.products);
    // })
    this.allProducts = this.products
    this._httpService.currentProduct.subscribe((data:any) => {
      console.log('currentproduct data', data);
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
      console.log('delete order data', data);
      this.allProducts = data.order
    })
  }
  totalSum(data) {
    console.log('\n\n\n***************************\n');
    console.log(' something console log here\n');
    console.log('***************************\n\n\n');    
    let sum = 0
    if(data) {
      console.log('from order component data exists? order', data);
      for(let i = 0; i < data.length; i++) {
        sum += +(data[i].quantity * data[i].price)
      }
      this.totalPrice.subTotal = sum * 0.072
      this.totalPrice.total = sum + this.totalPrice.subTotal
    }
    
  }
  
}

// console.log('\n\n\n***************************\n');
// console.log(' something console log here\n');
// console.log('***************************\n\n\n');


