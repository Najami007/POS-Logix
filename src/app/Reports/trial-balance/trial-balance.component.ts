import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import * as $ from 'jquery';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-trial-balance',
  templateUrl: './trial-balance.component.html',
  styleUrls: ['./trial-balance.component.scss']
})
export class TrialBalanceComponent {


  constructor(private globalData: GlobalDataModule,
    private http:HttpClient,
    private msg:NotificationService,
    private app:AppComponent

    ) { }

  ngOnInit(): void {
    this.globalData.setHeaderTitle('Trial Balance');
  }


  fromDate:any = new Date();
  toDate:any =  new Date();
  TrialBalanceData :any=[];

  oDebitTotal:any = 0;
  oCreditTotal:any = 0;
  debitTotal:any = 0;
  creditTotal:any = 0;
  cDebitTotal:any = 0;
  cCreditTotal:any = 0;


  


  getTrialBalance(){
this.TrialBalanceData = [];
    this.app.startLoaderDark();

    this.http.get(environment.mallApiUrl+'GetTrailBalanceRpt?fromdate='
    +this.globalData.dateFormater(this.fromDate,'-')+'&todate='+this.globalData.dateFormater(this.toDate,'-')).subscribe(
      (Response)=>{
        this.TrialBalanceData = Response;
        this.getTotal();
        this.app.stopLoaderDark();
      },
      (Error)=>{
        this.app.stopLoaderDark();
        this.msg.WarnNotify('Error Occured')
      }
    )
  
   
    

  }

  getTotal(){

   this.oDebitTotal = 0;
   this.oCreditTotal = 0;
   this.debitTotal = 0;
   this.creditTotal = 0;
   this.cDebitTotal = 0;
   this.cCreditTotal = 0;
    for(var i=0;i<this.TrialBalanceData.length;i++){
      this.oDebitTotal += this.TrialBalanceData[i].oDebit;
      this.oCreditTotal += this.TrialBalanceData[i].oCredit;
      this.debitTotal += this.TrialBalanceData[i].debit;
      this.creditTotal += this.TrialBalanceData[i].credit;
      this.cDebitTotal += this.TrialBalanceData[i].cDebit;
      this.cCreditTotal += this.TrialBalanceData[i].cCredit;

    }
  }


  PrintTable() {
  
    this.globalData.printData('#printReport');
  
  }

}
