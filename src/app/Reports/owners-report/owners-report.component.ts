import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-owners-report',
  templateUrl: './owners-report.component.html',
  styleUrls: ['./owners-report.component.scss']
})
export class OwnersReportComponent implements OnInit{

  constructor(
    private http:HttpClient,
    private msg:NotificationService,
    private global:GlobalDataModule,
    private app:AppComponent
    
  ){}


  ngOnInit(): void {
  
    this.getOwner();

  }


  ownerData:any;

  getOwner(){
    this.app.startLoaderDark();
    this.http.get(environment.mallApiUrl+'getowner').subscribe(
      {
        next:value=>{
          this.ownerData = value;
          console.log(value);
          this.app.stopLoaderDark();
        },
        error:error=>{
          this.msg.WarnNotify('Error Occured while Loading Data');
          console.log(error);
          this.app.stopLoaderDark();  
        }
      }
    )
  }

  print(){
    this.global.printData('#printRpt');
  }

}
