import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';

// import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  

  public productInfo = new BehaviorSubject<object>({})
  // currentProduct = this.productInfo.asObservable();

  constructor(private _http: HttpClient) {
    // this.productInfo.subscribe(console.log)
   }

  // getNextProduct(products:any) {
  //   // console.log('2');
  //   console.log('service',this.productInfo);
  //   // console.log('service', JSON.parse(JSON.stringify(this.productInfo)));
    
  //   console.log('behavior service', products);  
  //   this.productInfo.next(products)
  // }


  cart() {
    return this._http.get('api/cart')
  }
  addCart(product) {
    this._http.post('api/cart', product).subscribe(data => {
      console.log('service cart');
      
      this.productInfo.next(data['cart'])
    })
  }
  deleteCart() {
    return this._http.delete('api/cart')
  }


  getAll() {
    return this._http.get('api/tasks')
  }
  create(user) {
    return this._http.post('api/tasks', user)
  }
  findUser(user) {
    // console.log('service', user);
    return this._http.post('api/tasks/user', user)
  }
  logInUser() {
    return this._http.get('api/tasks/user')
  }
  loggedInUser(id) {
    return this._http.get('api/user/' +id)
  }
  logOutUser() {
    return this._http.get('api/user/logout')
  }
  allProduct() {
    return this._http.get('api/product')
  }
  createProduct(product) {
    return this._http.post('api/product', product)
  }
  editProduct(product_id, product) {
    return this._http.put('api/product/'+ product_id, product)
  }
  deleteProduct(id) {
    // console.log('hit deleteProduct service');
    return this._http.delete('api/product/' + id)
  }
  getOneProduct(id) {
    // console.log('hit getOneProduct Service', id)
    return this._http.get('api/product/' + id)
  }
  categoryFilter(category) {
    return this._http.get('api/product/' + category)
  }

}
