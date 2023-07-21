import { Component, OnInit } from '@angular/core';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';

@Component({
  selector: 'app-owner-profile',
  templateUrl: './owner-profile.component.html',
  styleUrls: ['./owner-profile.component.scss']
})
export class OwnerProfileComponent implements OnInit{
  constructor(private global:GlobalDataModule){

  }
 
    ngOnInit(){
      this.global.setHeaderTitle("Owner's Profile");
    }
  


  PartyID:any;
  ownerName:any;
  cnic:any;
  CityID:any;
  mobileNo:any;
  accountTitle:any;
  address:any;
  description:any;
  accountNo:any;
  txtSearch:any;
  btntype ='Save';


}
