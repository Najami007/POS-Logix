import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-shops-report',
  templateUrl: './shops-report.component.html',
  styleUrls: ['./shops-report.component.scss']
})
export class ShopsReportComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private msg:NotificationService,
    private global:GlobalDataModule,
    private app:AppComponent
    
  ){}


  ngOnInit(): void {
   this.getShop();
   
  }

  shopData:any;
  
    getShop(){
      this.app.startLoaderDark();
      this.http.get(environment.mallApiUrl+'GetShop').subscribe(
        {
          next:value=>{
            //console.log(value);
            this.shopData = value;
            this.app.stopLoaderDark();
          },
          error:error=>{
            console.log(error);
            this.msg.WarnNotify('error Occured while Loading Data');
            this.app.stopLoaderDark();
          }
        }
      )
    }


    print(){
      this.global.printData('#printRpt');
    }
  
  

}
