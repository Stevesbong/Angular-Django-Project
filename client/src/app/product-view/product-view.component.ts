import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  oneProduct:any
  constructor(private _httpService: HttpService,
    private _activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    console.log('hello?')
    this._activatedRoute.params.subscribe((params:Params) => {
      console.log('params', params.id)
      this.getProductDetail(params.id)
    })
  }
  getProductDetail(id) {
    console.log('method id', id)
    this._httpService.getOneProduct(id).subscribe((data:any) => {
      console.log('get data from django server', data)
      this.oneProduct = data.product[0]
    })
  }

}
