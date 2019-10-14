import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';

// import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public num = 0
  public cartLength = new BehaviorSubject<number>(this.num)
  public productInfo = new BehaviorSubject<object>({})
  public userInfo = new BehaviorSubject<object>({})

  currentProduct = this.productInfo.asObservable();

  constructor(private _http: HttpClient) { }

  orderProcess(order) {
    return this._http.post('api/order', order)
  }
  getUserOrder() {
    return this._http.get('api/order')
  }
  deleteOrder() {
    return this._http.delete('api/order')
  }
  checkout(products, totalprice) {
    return this._http.post('api/checkout', products, totalprice)
  }


  cart() {
    this._http.get('api/cart').subscribe(data => {
      this.productInfo.next(data)
    })
    return this._http.get('api/cart')
  }
  addCart(product) {
    this._http.post('api/cart', product).subscribe(data => {
      this.cartLength.next(data['cart'].length)
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
    return this._http.post('api/tasks/user', user)
  }
  logInUser() {
    this._http.get('api/tasks/user').subscribe((data:any) => {      
      this.userInfo.next(data)
    })
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
    return this._http.delete('api/product/' + id)
  }
  getOneProduct(id) {
    return this._http.get('api/product/' + id)
  }


  categoryFilter(category) {
    return this._http.get('api/product/' + category)
  }

}
