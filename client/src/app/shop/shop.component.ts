import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute, Params } from '@angular/router'
import {NgxPaginationModule} from 'ngx-pagination';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  allProducts:any =[]
  categorySearch:any = []
  user:any
  constructor(private _httpService:HttpService,
    private _router: Router,
    private _activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.getAllProduct()
  }

  getAllProduct() {
    this._httpService.allProduct().subscribe((data:any) => {
      this.allProducts = data
      for(let i = 0; i<data.products.length; i++) {
        if(!this.categorySearch.hasOwnProperty(data.products[i].category)){
          this.categorySearch.push(data.products[i].category)
        }
      }
      this.categorySearch = [...new Set(this.categorySearch)];
    })
  }
  categoryQuery(category) {
    this._httpService.categoryFilter(category).subscribe((data:any) => {
      this.allProducts.products = data.category
    })
  }
}