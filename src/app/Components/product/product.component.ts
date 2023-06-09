import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{

  constructor(private globalData:GlobalDataModule,
    private http:HttpClient
    ){}

  ngOnInit(): void {
    this.globalData.setHeaderTitle('Add Product');
    this.getCategory();
    this.getSubCategory();
    
    
  }


  CategoriesNames:any;
  SubCategoriesNames:any;
  hide= true;

  myCategoryID:any;
  mySubCategoryID:any;
  myProductName:any;
  myBarcodeType= 'auto';
  myBarcode:any;
  myBarcode1:any;
  myBarcode2:any;
  myBarcode3:any;
  myCostPrice:any;
  myCTCPrice:any;
  myWholeSalePrice:any;
  myRetailPrice:any;
  myGst:any;
  myUOM:any;

  // ChangeType(){
  //   if(this.myBarcodeType == 1){
  //     this.hide = true;
  //   }else{
  //     this.hide = false;
  //   }
  // }

  getCategory(){
    this.http.get(environment.apiUrl+'api/productCategory/getcategory',{responseType:'json'}).subscribe({
      next:value=>{
        this.CategoriesNames = value;
      },
      error:error=>{
        console.log(error);
      }
    })
  }


  getSubCategory(){
    this.http.get(environment.apiUrl+'api/productSubCategory/getsubcategory').subscribe({
      next:value=>{
        this.SubCategoriesNames = value;
      },
      error:error=>{
       
        console.log(error);
      }
    })
  }




  reset(){
    this.myCategoryID='';
    this.mySubCategoryID='';
    this.myProductName = '';
    this.myBarcode='';
    this.myBarcode1='';
    this.myBarcode2='';
    this.myBarcode3='';
    this.myCostPrice='';
    this.myCTCPrice='';
    this.myWholeSalePrice='';
    this.myRetailPrice= '';
    this.myGst = '';
    this.myUOM = '';
  }
}
