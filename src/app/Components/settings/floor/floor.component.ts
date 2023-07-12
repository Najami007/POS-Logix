import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AddFloorComponent } from './add-floor/add-floor.component';


@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss']
})
export class FloorComponent implements OnInit {

  constructor(private http:HttpClient,
    private msg:NotificationService,
    private dialogue: MatDialog,
    private globaldata:GlobalDataModule
    
    ){}



  ngOnInit(): void {
   
  }





  OpenDialogue(){
    this.dialogue.open(AddFloorComponent,{
      width:"40%",

    }).afterClosed().subscribe(val=>{
     
    })
  }

}
