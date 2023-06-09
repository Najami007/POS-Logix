import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';
import { MatDialog } from '@angular/material/dialog';
import { AddcityformComponent } from './addcityform/addcityform.component';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { error } from 'jquery';


@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit{

  constructor(private http:HttpClient,
    private msg:NotificationService,
    private dialogue: MatDialog,
    private globaldata:GlobalDataModule
    
    ){}

  ngOnInit(): void {
    this.getCity();
   
  }


  citiesData:any;


  OpenDialogue(){
    this.dialogue.open(AddcityformComponent,{
      width:"40%",

    }).afterClosed().subscribe(val=>{
      this.getCity();
    })
  }


  getCity(){
    this.http.get(environment.apiUrl+'api/city/getCity').subscribe({
      next:value=>{
        this.citiesData = value;
      },
      error:error=>{
        console.log(error.toString())
      }
    })
  }


  deleteCity(id:any){
    this.http.put(environment.apiUrl+'api/city/deletecity?id='+id,{
      deletedBy:this.globaldata.currentUserValue.userID,
    },{responseType:'text'}).subscribe(
      {
        next:value=>{
          this.msg.SuccessNotify(value);
          this.getCity();
        },
        error:error=>{
          this.msg.WarnNotify("Error Occured While Deleteing City!")
          console.log(error);
        }
      }
    )
  }

  updateCity(row:any){

    this.dialogue.open(AddcityformComponent,{
      width:"40%",
      data:row
    }).afterClosed().subscribe( {
      next:value=>{
        if(value === "update"){
          this.getCity();
        }
      }
    })
  }


}
