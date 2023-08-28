import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-billrptdatewise',
  templateUrl: './billrptdatewise.component.html',
  styleUrls: ['./billrptdatewise.component.scss']
})
export class BillrptdatewiseComponent implements OnInit{


  constructor(
    private http:HttpClient,
    private app:AppComponent,
    private msg:NotificationService,
    private global:GlobalDataModule
  ){}



  ngOnInit(): void {
    
    this.global.setHeaderTitle('Bill Report DateWise')
  }



  fromDate = new Date();
  toDate = new Date();

  reportData:any = [];



  getReport(){
    this.app.startLoaderDark();
    this.http.get(environment.mallApiUrl+'GetBillRptDatewise?startdate='+this.fromDate.toISOString().substring(0,10)+
    '&enddate='+this.toDate.toISOString().substring(0,10)).subscribe(
      (Response)=>{
        console.log(Response);
        this.reportData = Response;
        this.app.stopLoaderDark();
      },
      (Error)=>{
        console.log(Error);
        this.app.stopLoaderDark();
      }
    )
  }



  PrintTable(){
    if(this.reportData != ''){
      this.global.printData('#printRpt')
    }
    
  }

}
