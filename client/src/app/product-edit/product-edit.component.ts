import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  oneProduct:any
  constructor(private _httpService: HttpService,
    private _activatedRoute:ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.oneProduct = {
      name:"",
      description:"",
      price:"",
      stock:"",
      category:""
    }
    this._activatedRoute.params.subscribe((params:Params) => {
      // console.log('params', params.id)
      this.getProductDetail(params.id)
    })
  }
  getProductDetail(id) {
    // console.log('method id', id)
    this._httpService.getOneProduct(id).subscribe((data:any) => {
      // console.log('get data from django server', data)
      this.oneProduct = data.product[0]
    })
  }
  onSubmit() {
    // console.log('onsubmit')
    // console.log(this.oneProduct)
    this._httpService.editProduct(this.oneProduct.id , this.oneProduct).subscribe((data:any) => {
      this._router.navigate(['/product'])
    })
  }

}
