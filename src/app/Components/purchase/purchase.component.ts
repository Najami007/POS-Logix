import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  constructor(private http:HttpClient,
    private globalData:GlobalDataModule){

  }
  ngOnInit(): void {
    this.globalData.setHeaderTitle('Purchase');
    this.getProducts();
    this.getSuppliers();
  }


  PBarcode:any;   /// for Search barcode field
  productsData:any;   //// for showing the products
  holdData:any;           //////will hold data temporarily
  suppliersList:any;      //////  will shows the supplier list
 
  currentPartyAddress:any;  /////////// will shows the current party address on page
  currentPartyCity:any;      /////////// will shows the current party City on page
  currentPartyMobile:any;   /////////// will shows the current party Mobile on page
  currentPartyCNIC:any;     /////////// will shows the current party CNIC on page


  partyID:any;               /////// will get the party id for Api
  invoiceDate = new Date;    //////////// invoice date for api



  getProducts() {
    this.http.get(environment.apiUrl + 'api/product/getproduct').subscribe({
      next: (value) => {
        console.log(value);
        this.productsData = value;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }


   ///////////////////////get the Suppliers Data////////////////////
   getSuppliers() {
    this.http.get(environment.apiUrl + 'api/party/getsupplier').subscribe({
      next: (value) => {
        console.log(value);
        this.suppliersList = value;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }


//////////////// for showing the party Data ///////////////////////////////
  getCurSupplierData(){
   var currentSupplier = this.suppliersList.find((x:any)=>x.partyID == this.partyID);
   console.log(currentSupplier);
    this.currentPartyAddress = currentSupplier.partyAddress;
    this.currentPartyCity = currentSupplier.cityName;
    this.currentPartyMobile = currentSupplier.mobileNo;
    this.currentPartyCNIC = currentSupplier.partyCNIC;
  }

  
  ///////////////////hold data funcition pushes data into holdData list/////////////////////
  holdDatafunc(data: any) {

    console.log(data);
    this.holdData.push({
      productID : data.productID,
      barcode :data.pBarcode,
      productName:data.productName,

    })

   this.PBarcode = '';
  }














}
