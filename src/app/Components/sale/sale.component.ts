import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit{


  constructor(private http:HttpClient,
    private globalData :GlobalDataModule,
    private msg :NotificationService,
    ){}

  ngOnInit(): void {
   this.globalData.setHeaderTitle("Sale");
   this.getProducts();
  }

  productsData:any;
  PBarcode='';

  subtoatal =0;
  discount=0;
  total = 0;
  paid = 0;
  due=0;




  getProducts(){
    this.http.get(environment.apiUrl+'api/product/getproduct').subscribe({
      next:value=>{
        this.productsData = value;
      },
      error:error=>{
        console.log(error);
      }
    })
  }


}
