import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AddCAMComponent } from './add-cam/add-cam.component';

@Component({
  selector: 'app-cam',
  templateUrl: './cam.component.html',
  styleUrls: ['./cam.component.scss']
})
export class CAMComponent implements OnInit {

  constructor(private http:HttpClient,
    private msg:NotificationService,
    private dialogue: MatDialog,
    private globaldata:GlobalDataModule
    
    ){}


  ngOnInit(): void {
   
  }






  OpenDialogue(){
    this.dialogue.open(AddCAMComponent,{
      width:"30%",

    }).afterClosed().subscribe(val=>{
  
    })
  }

}
