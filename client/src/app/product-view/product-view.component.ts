import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  oneProduct:any
  products:any
  oneUser:any

  constructor(private _httpService: HttpService,
    private _activatedRoute:ActivatedRoute,
    private _router:Router) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((params:Params) => {
      this.getProductDetail(params.id)
    })
    this._httpService.userInfo.subscribe((data:any) => {
      this.oneUser = data.user
    })
  }
  getProductDetail(id) {
    this._httpService.getOneProduct(id).subscribe((data:any) => {
      this.oneProduct = data
    })
  }

  productToCart(product) {
    this._httpService.addCart(product)
  }
}
