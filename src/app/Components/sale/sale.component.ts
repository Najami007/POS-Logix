import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';
import * as $ from 'jquery';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss'],
})
export class SaleComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private globalData: GlobalDataModule,
    private msg: NotificationService
  ) { }

  ngOnInit(): void {
    this.globalData.setHeaderTitle('Sale');
    this.getProducts();
    this.getCustomer();
    this.getInvoices();
   
  }

  productsData: any;
  customersList: any;
  PBarcode = '';
  holdData: any = [];
  curDate =new Date();
  Invoices:any;
  searchtxt:any;

  myPartyID = 1;
  myTotalQty = 0;

  myProdQty = 1;
  mySubtoatal = 0;
  myDiscount = 0;
  myTotal = 0;
  myPaid = 0;
  myDue = 0;
  myRemarks='-';


  ///////////////////////get the customers Data////////////////////
  getCustomer() {
    this.http.get(environment.apiUrl + 'api/party/getcustomer').subscribe({
      next: (value) => {
        this.customersList = value;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  //////////////////////get the products Data///////////////////////
  getProducts() {
    this.http.get(environment.apiUrl + 'api/product/getproduct').subscribe({
      next: (value) => {
        this.productsData = value;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }



  ///////////////get the Saved Invoice data///////////////////////

  getInvoices(){
    this.http.get(environment.apiUrl+'api/sale/getSaleInvoice').subscribe({
      next:value=>{
        this.Invoices = value;
        console.log(this.Invoices);
      },
      error:error=>{
        console.log(error);
      }
    })
  }

  ///////////////gives the total of products quantity and total Bill Amount etc///////////////////
  getTotal() {
    this.mySubtoatal = 0;
    this.myTotalQty = 0;
    for (var i = 0; i < this.holdData.length; i++) {
      this.mySubtoatal +=
        this.holdData[i].Quantity * this.holdData[i].SalePrice;
      this.myTotalQty += parseFloat(this.holdData[i].Quantity);
      this.myTotal = this.mySubtoatal - this.myDiscount;
      this.myDue = this.myPaid - this.myTotal;
    }
  }

  EnterData(event: any) {


    // var product = this.productsData.find(
    //   (x: any) =>
    //     x.pBarcode === event.target.value ||
    //     x.pBarcode1 === event.target.value ||
    //     x.pBarcode2 === event.target.value
    // );

    // var condition = this.holdData.find(
    //   (x: any) => x.productID == product.productID
    // );

    // var index = this.holdData.indexOf(condition);

    // if (condition == undefined) {

    //   if (product != undefined) {
    //     this.holdData.push({
    //       productID: product.productID,
    //       productName: product.productName,
    //       salePrice: product.salePrice,
    //       Quantity: 1,
    //       costPrice: product.costPrice,
    //     });
    //     this.getTotal();

    //     this.PBarcode = '';
    //     $('#searchProduct').trigger('focus');
    //   } else {
    //     alert('Product Not Found');
    //   }

    // } else {
    //   this.holdData[index].Quantity += 1;
    //   this.getTotal();
    //   this.PBarcode = '';
    //   $('#searchProduct').trigger('focus');
    // }
  }

  ///////////////////hold data funcition pushes data into holdData list/////////////////////
  holdDatafunc(data: any) {
    var condition = this.holdData.find(
      (x: any) => x.productID == data.productID
    );

    var index = this.holdData.indexOf(condition);

    if (condition == undefined) {
      this.holdData.push({
        ProductID: data.productID,
        ProductName: data.productName,
        SalePrice: data.salePrice,
        Quantity: 1,
        CostPrice: data.costPrice,
        Gst:data.gst,
       
      });
      this.getTotal();
      this.PBarcode = '';
      $('#searchProduct').trigger('focus');
    } else {
      this.holdData[index].Quantity += 1;
      this.getTotal();
      this.PBarcode = '';
      $('#searchProduct').trigger('focus');
    }
  }

  //////////////////////delete the specific row for holddata.]////////////////
  delRow(item: any) {
    var index = this.holdData.indexOf(item);
    this.holdData.splice(index, 1);
    this.getTotal();
  }



  ////////calls on Change of Quantity of the product//////////////
  onQtyChange(item: any) {
    var index = this.holdData.indexOf(item);
    var myQty = this.holdData[index].Quantity;
    var curQty = myQty;
    // console.log(myQty);
    // console.log(index);
   
    var qty = $('#pQty').val(); 

    if(myQty <= 0 || myQty == '' || myQty == null){
      
      this.msg.WarnNotify("Zero , Empty or Negative Value Not Allowed");
      
      this.holdData[index].Quantity = 1 ;
      this.getTotal();
    }else{
    this.holdData[index].Quantity = qty;
    this.holdData[index].Quantity = myQty;
    
    console.log(this.holdData);
    this.getTotal();
    // $('#pQty').val('');
    }
  }



  CashSale(){
    this.http.post(environment.apiUrl+'api/sale/insert',{

      partyID : this.myPartyID,
      cashReceived:this.myPaid,
      // cashReturn:this.myDue,
      InvoiceDate:this.curDate,
      changed:this.myDue,
      discount:this.myDiscount,
      type:'S',
      subType:'Sale',
      sectionID:this.globalData.currentUserValue.sectionID,
      remarks:this.myRemarks,
      createdBy:this.globalData.currentUserValue.userID,
      hdnRemarks:'Sale Invoice',
      locationID:1,
      inoviceDetails: JSON.stringify(this.holdData),

      

    },{responseType:'text'}).subscribe({
      next:value=>{
        console.log(value);
        this.msg.SuccessNotify(value);
        this.reset();
        this.getInvoices();

      },
      error:error=>{
        console.log(error);
        this.msg.WarnNotify("Error Occured While Saving Invoice");
      }
    });
  }


  reset(){
    this.myDiscount = 0;
    this.myDue = 0;
    this.myPaid = 0;
    this.myPartyID = 1;
    this.myRemarks = '-';
    this.mySubtoatal = 0;
    this.myTotal = 0;
    this.holdData = [];
    this.getTotal();

  }
}
