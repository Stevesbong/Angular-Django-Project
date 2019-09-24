import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-shop-product',
  templateUrl: './shop-product.component.html',
  styleUrls: ['./shop-product.component.css']
})
export class ShopProductComponent implements OnInit {

  @Input() allProducts: any
  constructor(private _httpService:HttpService) { }

  ngOnInit() {
    
  }
  productToCart(product) {
    this._httpService.addCart(product)
  }

}
