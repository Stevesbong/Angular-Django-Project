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
  oneUser:any
  categorySearch:any = []

  // description:any
  constructor(private _httpService:HttpService,
    private _router: Router,
    private _activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.getAllProduct()
  }
  getOneUser() {
    this._httpService.logInUser().subscribe((data:any) => {
      console.log('logInUser', data, data.id);
      if(data.id){
        console.log('check id', data.id);
        this._httpService.loggedInUser(data.id).subscribe((data:any) => {
          console.log('data from loggedInUser', data.user[0]);
          this.oneUser = data.user[0]
        })
      } else {
        console.log('error');
        this._router.navigate(['/'])
      }
    })
  }
  getAllProduct() {
    console.log('get all Product')
    this._httpService.allProduct().subscribe((data:any) => {
      console.log('get all product from django server')
      console.log('data from django server', data.products);
      this.allProducts = data.products
      console.log('check', this.categorySearch);
      
      // if(this.categorySearch.length == 0) {
      //   for(let i=0; i<data.products.length-1; i++) {
      //     if(data.products[i].category != data.products[i+1].category)
      //     this.categorySearch.push(data.products[i].category)
      //   }
      // }
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
      console.log('steve');
      console.log('steve works', data.category);
      this.allProducts = data.category
    })
  }
  
  
  
  logOut() {
    this.oneUser = ""
    this._httpService.logOutUser().subscribe((data:any) => {
      console.log(data)
      if(data) {
        // console.log('hello');
        // this._router.navigate(['/'])
        // console.log('another hello');
      }
    })
    // console.log('user logout');
    // this._router.navigate(['/'])
  }
  
}
// oneDescription(index) {
//   // console.log('hi', this.allProducts[i]);
  
//   for(var i = 0; i < this.allProducts.length; i++) {
//     if (index == this.allProducts[i].id) {
//       this.description = this.allProducts[i]        
//     }
//   }
//   console.log(this.description)
// }
