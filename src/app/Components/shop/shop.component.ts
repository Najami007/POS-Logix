import { Component } from '@angular/core';
import { AddShopComponent } from './add-shop/add-shop.component';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {

  constructor(private http:HttpClient,
    private msg:NotificationService,
    private dialogue: MatDialog,
    private globaldata:GlobalDataModule
    
    ){}


  ngOnInit(): void {
   
  }






  OpenDialogue(){
    this.dialogue.open(AddShopComponent,{
      width:"30%",

    }).afterClosed().subscribe(val=>{
  
    })
  }

}
