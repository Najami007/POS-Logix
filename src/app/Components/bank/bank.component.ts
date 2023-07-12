import { Component, OnInit } from '@angular/core';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit{

  constructor(private globalData:GlobalDataModule){

  }



  ngOnInit(): void {
    this.globalData.setHeaderTitle('Add Bank');
  }




  btntype='Save';
  progressbar=false;


  txtSearch:any;
  bankName:any;
  accTitle:any;
  accountNumber:any;
  branchName:any;
  bankCode:any;
  bankAddress:any;
  accountCode:any;
  description:any;



}
