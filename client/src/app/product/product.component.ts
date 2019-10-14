import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css',
  '../register-feature/register-feature.component.css']
})
export class ProductComponent implements OnInit {

  newProduct:any
  allProducts:any = []
  constructor(private _httpService:HttpService,
    private _router: Router) { }

  ngOnInit() {
    this.getAllProduct()
    this.newProduct = {
      name:"",
      description:"",
      price:"",
      stock:"",
      category:"",
      image:""
    }

  }

  onProductSubmit() {
    this._httpService.createProduct(this.newProduct).subscribe((data:any) => {
      this.getAllProduct()
    })
  }
  getAllProduct() {
    this._httpService.allProduct().subscribe((data:any) => {
      if(data.logged_in == true) {
        this.allProducts = data.products
      } else {
        this._router.navigate(['/'])
      }
    })
  }
  deleteProduct(id) {
    this._httpService.deleteProduct(id).subscribe((data:any) => {
      this.getAllProduct()
    })
  }
  changeImage(event) {
    let _this = this;
    let file = event.target.files[0]
    let reader = new FileReader();
    reader.addEventListener("load", function() {                
      _this.newProduct['filename'] = file.name;                
      _this.newProduct['image'] = reader.result;
      
  }, false);
    if (file) {
      reader.readAsDataURL(file)
    }
  }
}
