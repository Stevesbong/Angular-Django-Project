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

  allProduct:any =[]
  constructor(private _httpService:HttpService,
    private _router: Router,
    private _activatedRoute:ActivatedRoute) { }

    oneUser:any
  ngOnInit() {
    this._activatedRoute.params.subscribe((params:Params) => {
      this.getOneUser(params.id)
    })

    for(let i=1;i<=100;i++){
      let Obj = {'name': `Employee Name ${i}`,'code': `EMP00 ${i}`}
      this.allProduct.push(Obj);
    }
    console.log(this.allProduct)
  }

  getOneUser(id) {
    this._httpService.loggedInUser(id).subscribe((data:any) => {
      this.oneUser = data.user[0]      
    })

  }

  makeComputerFilterFunction() {
    this._router.navigate(['/login'])
  }

}
