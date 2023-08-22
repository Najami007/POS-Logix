import { animate } from '@angular/animations';
import { Component, ElementRef, OnInit ,ViewChild} from '@angular/core';
import {FormControl } from '@angular/forms';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss']
})
export class LedgerComponent {

  date = new FormControl(new Date());

  CoaList:any;

  constructor( private globalData: GlobalDataModule,
    private http:HttpClient,
    private msg:NotificationService,

    ) { }

  ngOnInit(): void {
    // this.getTotal();
    this.globalData.setHeaderTitle('Ledger');
    this.getCoa();
  }

  coaID:any;
  startDate = new Date();
  EndDate = new Date();
  debitTotal=0;
  creditTotal=0;
  curCOATitle:any;

  



  tableData:any = [];
 placholder = 'Search...';
 txtSearch = '';
 curDate = new Date();




 ////////////////////////getting total of debit and credit Sides///////////
 


    getTotal(){
      this.debitTotal = 0;
      this.creditTotal = 0; 
      for(var i=0;i<this.tableData.length;i++){
        this.debitTotal += this.tableData[i].debit;
        this.creditTotal += this.tableData[i].credit;
      }
    }
  
 
  PrintTable() {
    this.globalData.printData('#printRpt');
    
  }


  /////////////////////////////////////////////

  getCoa(){
    this.http.get(environment.mallApiUrl+'GetVoucherCOA').subscribe(
      (Response)=>{
        // console.log(Response);
        this.CoaList = Response;
      }
    )
  }


  ///////////////////////////////////////////////////////

  getLedgerReport(){

    if(this.coaID == '' || this.coaID == undefined){
      this.msg.WarnNotify('Select Chart Of Account Title')
    }else{

      /////////////////// finding the coaTitle from coalist by coaID////////
      var curRow = this.CoaList.find((e:any)=> e.coaID == this.coaID);
    
      this.curCOATitle = curRow.coaTitle;
      /////////////////////////////////////////////////

     
      this.http.get(environment.mallApiUrl+'GetLedgerRpt?coaid='+this.coaID +'&fromdate='
      +this.globalData.dateFormater(this.startDate,'-') +'&todate='+this.globalData.dateFormater(this.EndDate,'-')).subscribe(
        (Response)=>{
          console.log(Response);
          this.tableData = Response;
          this.getTotal();
        },
        (Error)=>{
          console.log(Error);
        }
      )
    }


    
  }


}
