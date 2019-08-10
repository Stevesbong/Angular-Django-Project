import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute, Params } from '@angular/router'
import {NgxPaginationModule} from 'ngx-pagination';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allProducts:any =[]
  oneUser:any
  constructor(private _httpService:HttpService,
    private _router: Router,
    private _activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.getOneUser()
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
    })
  }




  logOut() {
    this.oneUser = ""
    this._httpService.logOutUser().subscribe((data:any) => {
      console.log(data)
      if(data) {
        console.log('hello');
        this._router.navigate(['/'])
        console.log('another hello');
      }
    })
    console.log('user logout');
    this._router.navigate(['/'])
  }

  makeComputerFilterFunction() {
    this._router.navigate(['/login'])
  }

}
