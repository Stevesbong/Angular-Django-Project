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

  // description:any
  constructor(private _httpService:HttpService,
    private _router: Router,
    private _activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.getAllProduct()
    // this._httpService.user.subscribe(c => {
    //   this.user = c
    // })
    // console.log('testing behavior', this.user);
    
  }

  getAllProduct() {
    // console.log('get all Product')
    this._httpService.allProduct().subscribe((data:any) => {
      // console.log('get all product from django server')
      console.log('data from django server', data);      
      this.allProducts = data
      // console.log('check', this.categorySearch);

      for(let i = 0; i<data.products.length; i++) {
        if(!this.categorySearch.hasOwnProperty(data.products[i].category)){
          this.categorySearch.push(data.products[i].category)
        }
      }
      this.categorySearch = [...new Set(this.categorySearch)];
    })
  }
  categoryQuery(category) {
    console.log('hello', category);
    this._httpService.categoryFilter(category).subscribe((data:any) => {
      // console.log('steve');
      console.log('steve works', data);
      this.allProducts.products = data.category
    })
  }
}
