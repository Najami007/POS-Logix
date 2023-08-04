  import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import * as $ from 'jquery';
import { find, isEmpty } from 'rxjs';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';


@Component({
  selector: 'app-voucherform',
  templateUrl: './voucherform.component.html',
  styleUrls: ['./voucherform.component.scss'],

})
export class VoucherformComponent implements OnInit{

  constructor(private msg: NotificationService,private globalData:GlobalDataModule) { }

  ngOnInit(): void {
    this.disableRow1();
    this.globalData.setHeaderTitle('Voucher');
  }

  tableData: any = [
  {date: '04-11-2023',Invno: '2530',party: 'Test',amount: 20000},
  {date: '04-11-2023',Invno: '2530',party: 'hunter',amount: 20000},
  {date: '04-11-2023',Invno: '2530',party: 'Umer',amount: 20000},
  {date: '04-11-2023',Invno: '2530',party: 'mer',amount: 20000},
  {date: '04-11-2023',Invno: '2530',party: 'Najam',amount: 20000},
  {date: '04-11-2023',Invno: '2530',party: 'Dani',amount: 20000},
  {date: '04-11-2023',Invno: '2530',party: 'Bhatti', amount: 20000},
  {date: '04-11-2023',Invno: '3540',party: 'none',amount: 20000},
  ]


  vTypes: any = [
    { type: 'Payment', value : 1 },
    { type: 'Receipt' ,value : 2},
    { type: 'Journal Voucher' ,value : 3}
  ]

  Types: any = [
    { t: 'Cash' },
    { t: 'Bank' }
  ]

  parties: any = [
    'Najam',
    'Adnan',
    'Bhatti',
    'Umer'
  ]

  CoaHeads = [{ name: 'Salaries' },
  { name: 'Wages' },
  { name: 'Stationary' },
  { name: 'Fixed Asset' },
  { name: 'Current Asset' },
  { name: 'Current Liability' },
  { name: 'Capital' },
  { name: 'Income' },]

  Bank: any = [
    'Habib Bank',
    'United Bank',
    'Muslim Commercial Bank'
  ]


  /////////////////declared Variables//////////////////////
  cash = 'Cash';
  coaSearch = '';
  txtSearch: string = '';

  vTypeselectedValue: any;
  transactionTypeSeletedValue: any = 'Cash';
  vDate: any = new Date();
  refrenceCOA: any ;
  party: any = 'Select Party';
  COATitle: any ;
  DAmount: number = 0 ;
  CAmount: number = 0 ;
  VoucherData: any = [];
 
  disableR1=false;
  disableBank = false;
  disableDebit = false;
  disableCredit = false;
  debittotal :number = 0;
  creditTotal :number = 0;
  COA: any = [];
  narration='';

  getval(val:any){
    alert(this.vDate);
  }


  
  

  ///////////////////save button valiations ///////////////////

  vTypeValue(type: any) {

    if(this.vTypeselectedValue != "" ){
      this.COA = this.CoaHeads;
    }

    if ( this.vTypeselectedValue == 1) {
      
      this.disableDebit = false;
      this.disableCredit = true;
      this.disableBank = false;

    } else if (this.vTypeselectedValue == 2) {
      this.disableCredit = false;
      this.disableDebit = true;
      this.disableBank = false;

    } else if (this.vTypeselectedValue == 3) {
      this.disableDebit = false;
      this.disableCredit = false;
      this.disableBank = true;
    } else { }
  }

  // gettransactionTyeValue(e: any) {
  //   if (this.transactionTypeSeletedValue == 'Cash') {
  //     // this.refBank = "Cash In Hand";
  //   } else if (this.transactionTypeSeletedValue == 'Bank') {
  //     this.disableBank = false;
  //   }
  // }

  //////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////will change the debit and credit field value if ///////////////////////////
  ////////////////////// value is in minue ///////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////

  changeValue(val: any) {
    // alert(val.target.value);
    if (val.target.value < '0') {
      val.target.value = '0';
    }else if(val.target.value == ''){
      val.target.value = '0';
    }
  }


  //////////////////////////

  getTotal(){
    this.debittotal = 0;
    this.creditTotal = 0;
    // this.VoucherData.forEach((a:any) => this.debittotal +=parseFloat(a.vDebit) );
    // this.VoucherData.forEach((a:any) => this.creditTotal +=parseFloat( a.vCredit)  );
    for (var i = 0; i < this.VoucherData.length; i++) {
      this.debittotal += parseFloat(this.VoucherData[i].vDebit);
      this.creditTotal += parseFloat(this.VoucherData[i].vCredit);
    }
  }

  // //////////save fuction to hold data in Voucher Data array/////////////

  save(dA: any, cA: any) {
    // finding the value of coatitle in voucherdata array here
    const findValue = this.VoucherData.find((obj : any) => obj.title === this.COATitle);
    
    
    if (this.COATitle == "" || this.COATitle == "Select COA Title" || this.COATitle == undefined) {
      this.msg.WarnNotify('Please Select COA Title');
    } else if (dA.value == '' || dA.value == 0 && this.vTypeselectedValue == 1 ) {
      this.msg.WarnNotify('Please Enter Debit Amount');
    } else if (cA.value == '' || cA.value == 0 && this.vTypeselectedValue == 2 ) {
      this.msg.WarnNotify('Please Enter Credit Amount');
    }else if(dA.value != 0  && cA.value != 0  ){
      this.msg.WarnNotify('One Side Must be Zero');
    }else if(findValue != undefined){
      if(findValue.title == this.COATitle){
        this.msg.WarnNotify('Title Already Exists!');
      } 
    }else {
      this.VoucherData.push({ title: this.COATitle, vDebit:dA.value, vCredit: cA.value }); 
      this.getTotal();
      this.disableRow1();
      $('#cTitle').trigger('focus');
      this.COATitle = '';
        dA.value = 0;
        cA.value = 0   
    }
   
  }



  ////////////////////to disable row 1 on getting data in voucher Data/////////////////
  /////////////////// and again anable on deletion of voucher data ////////////////////////

  disableRow1(){
    if(this.VoucherData != ''){
      this.disableR1 = true;
    }else{
      this.disableR1 = false;
    }
  }


  

  /////////////////////// to Delete the row from voucher Data /////////////////////

  deleteRow(item: any) {
    var index = this.VoucherData.indexOf(item);
    this.VoucherData.splice(index,1);
    this.getTotal();
    this.disableRow1();
    // this.getTotal();
  }



  //////////////////////////submit funcition to send data to api/////////////////////////


  submit() {
    if(this.vTypeselectedValue == 3){
      if(this.debittotal != this.creditTotal){
        this.msg.WarnNotify('Debit and Credit Side Must Be Equal')
      }
      else{
        this.VoucherData = [];
        this.debittotal = 0;
        this.creditTotal = 0;
        this.msg.SuccessNotify('Data Saved Succesfully');
      }
    }
  }

}
