import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.development';

import * as $ from 'jquery';

@Component({
  selector: 'app-cashbook',
  templateUrl: './cashbook.component.html',
  styleUrls: ['./cashbook.component.scss']
})
export class CashbookComponent  implements OnInit{


  constructor(
    private http:HttpClient,
    private msg:NotificationService,
    private app:AppComponent,
    private globalData:GlobalDataModule
  ){}


  ngOnInit(): void {
    $('.cashSummary').hide();
  }



  fromDate:Date = new Date();
  toDate:Date = new Date();


  tableData:any;

  cashSummary:any;
  
 //////////////// print Variables/////////////////////

 lblInvoiceNo:any;
 lblInvoiceDate:any;
 lblRemarks:any;
 lblVoucherType:any;
 lblVoucherTable:any;
 lblDebitTotal:any;
 lblCreditTotal:any;
 lblVoucherPrintDate = new Date();
 invoiceDetails:any;



/////////////////////////////////////////////////////////////////
  getDetailReport(){

    this.app.startLoaderDark();

    $('#CashBookDetail').show();

    this.http.get(environment.mallApiUrl+'GetCashBookDetailRpt?fromdate='+this.globalData.dateFormater(this.fromDate,'-')+
    '&todate='+this.globalData.dateFormater(this.toDate,'-')).subscribe(
      (Response:any)=>{
        console.log(Response);
        this.tableData = Response;
        this.app.stopLoaderDark();
      },
      (Error)=>{
        this.msg.WarnNotify('Error Occured While Loading Report')
        this.app.stopLoaderDark();
      }
    )
  }


  //////////////////////////////////////////////////
  getSummary(){
    this.app.startLoaderDark();
 
    // $('#CashBookDetail').css('visibility','hidden');
    $('#CashBookDetail').hide();
    $('.cashSummary').show();

    this.http.get(environment.mallApiUrl+'GetCashBookSummaryRpt?fromdate='+this.globalData.dateFormater(this.fromDate,'-')+
    '&todate='+this.globalData.dateFormater(this.toDate,'-')).subscribe(
      (Response)=>{
        
        console.log(Response);
        this.cashSummary = Response;
        this.app.stopLoaderDark();
      },
      (Error)=>{
        this.msg.WarnNotify('Error Occured While Loading Report')
        this.app.stopLoaderDark();
      }
    )
  }


  ////////////////////////////////////////////////////
  print(){

    this.globalData.printData('#printRpt')
  }


  /////////////////////////////////////////////

  getInvoiceDetail(invoiceNo:any){

    this.lblDebitTotal = 0;
    this.lblCreditTotal = 0;
    this.invoiceDetails = [];   
    
    this.http.get(environment.mallApiUrl+'GetSpecificVocherDetail?InvoiceNo='+invoiceNo).subscribe(
      (Response:any)=>{
        // console.log(Response);
        this.invoiceDetails = Response;
        if(Response != ''){
         
          Response.forEach((e:any) => {
            this.lblDebitTotal += e.debit;
            this.lblCreditTotal += e.credit;
          });
        }
      },
      (error:any)=>{
        console.log(error);
        this.msg.WarnNotify('Error Occured While Printing');
      }
    )
  }

}
