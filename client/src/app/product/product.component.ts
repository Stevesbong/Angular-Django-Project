import { Component, OnInit } from '@angular/core';
// import bsCustomFileInput from 'bs-custom-file-input';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css',
  '../register-feature/register-feature.component.css']
})
export class ProductComponent implements OnInit {

  newProduct:any
  allProducts:any = []
  constructor(private _httpService:HttpService,
    private _router: Router) { }

  ngOnInit() {
    // bsCustomFileInput.init()
    this.getAllProduct()
    this.newProduct = {
      name:"",
      description:"",
      price:"",
      stock:"",
      category:"",
      // file:""
    }

  }

  onSubmit() {
    // console.log('onsubmit')
    // console.log(this.newProduct)
    this._httpService.createProduct(this.newProduct).subscribe((data:any) => {
      // console.log('get from createProduct view', data)
      this.getAllProduct()
    })
  }
  getAllProduct() {
    // console.log('get all Product')
    this._httpService.allProduct().subscribe((data:any) => {
      
      // console.log('helllllll');
      // console.log(data.logged_in);
      if(data.logged_in == true) {
        // console.log('get all product from django server')
        // console.log('data from django server', data.products);
        this.allProducts = data.products
      } else {
        // console.log('hi');
        this._router.navigate(['/'])
      }
      
    })
  }
  deleteProduct(id) {
    // console.log('id come in', id)
    this._httpService.deleteProduct(id).subscribe((data:any) => {
      // console.log('get data from django server', data)
      this.getAllProduct()
    })
  }

}
