import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  oneProduct:any
  constructor(private _httpService: HttpService,
    private _activatedRoute:ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.oneProduct = {
      name:"",
      description:"",
      price:"",
      stock:"",
      category:""
    }
    this._activatedRoute.params.subscribe((params:Params) => {
      this.getProductDetail(params.id)
    })
  }
  getProductDetail(id) {
    this._httpService.getOneProduct(id).subscribe((data:any) => {
      this.oneProduct = data.product[0]
    })
  }
  onSubmit() {
    this._httpService.editProduct(this.oneProduct.id , this.oneProduct).subscribe((data:any) => {
      this._router.navigate(['/product'])
    })
  }
  changeImage(event) {
    let _this = this;
    let file = event.target.files[0]
    let reader = new FileReader();
    reader.addEventListener("load", function() {                
      _this.oneProduct['filename'] = file.name;                
      _this.oneProduct['image'] = reader.result;
      
  }, false);
    if (file) {
      reader.readAsDataURL(file)
    }
  }
}
