import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service'
import { Router } from '@angular/router'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  constructor(private _httpService:HttpService,
    private _router:Router) {

  }

  OnInit() {
  }


  goHome() {
    this._router.navigate(['/login'])
  }
}
