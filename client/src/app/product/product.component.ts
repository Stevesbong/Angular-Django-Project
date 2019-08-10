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
    console.log('onsubmit')
    console.log(this.newProduct)
    this._httpService.createProduct(this.newProduct).subscribe((data:any) => {
      console.log('get from createProduct view', data)
      this.getAllProduct()
    })
  }
  getAllProduct() {
    console.log('get all Product')
    this._httpService.allProduct().subscribe((data:any) => {
      console.log('get all product from django server')
      console.log('data from django server', data.products);
      this.allProducts = data.products
    })
  }

}
