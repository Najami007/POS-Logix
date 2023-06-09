import { Component, OnInit } from '@angular/core';
import { Form, FormControl } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-coaform',
  templateUrl: './coaform.component.html',
  styleUrls: ['./coaform.component.scss']
})
export class CoaformComponent implements OnInit {

  constructor(private msg:NotificationService,
    private app:AppComponent,
    private formBuilder: FormBuilder,
    private globalData: GlobalDataModule
    ) { }

  ngOnInit(): void {
    this.globalData.setHeaderTitle('Charts Of Accounts');
  }

  

 tabledata = [{
  ac:'01.10.20',at:'current Assets',type:'Expense',},
 {ac:'01.10.20',at:'current Assets',type:'Expense',},
 {ac:'01.10.20',at:'current Assets',type:'Expense',},
 {ac:'01.10.20',at:'Entertainment',type:'Expense',},
 {ac:'01.10.20',at:'rent',type:'Expense',},
 {ac:'01.03.03',at:'Wages',type:'Expense',},
 {ac:'01.02.01',at:'Salaries ',type:'Expense',},
 {ac:'01.10.20',at:'current Expense',type:'Expense',},
 {ac:'01.10.20',at:'fixed Assets',type:'Asset',},
]




  coaSearch='';
  txtSearch : string='';
  hideLevel1 = false;
  hideLevel2 = false;
  hideInputField = false;
  btnValue = 'Save';


  coaTypes = [
    { type: 'Asset' },
    { type: 'Expense' },
    { type: 'Income' },
    { type: 'Liabilty' },
    { type: 'Capital' }
  ]

  CoaLevel = [
    { level: 'level 1' },
    { level: 'level 2' },
    { level: 'level 3' },

  ]

  Allow = [
    { val: 'Yes' },
    { val: 'No' },
  ]

  
  COAForm = this.formBuilder.group({
    CoaTile: [''],
    AccountHeadLabel: [''],
    level1: [''],
    level2: [''],
    levelInput: [''],
    HeadTitle: [''],
    TransactionAllowed: [''],

  })


  //////////////setting the value of account head level above Head Name field/////////////////

  AccountLabelHeadValue:any = '';
  setvalue(){
    
    // return  this.AccountLabelHeadValue = this.COAForm.controls['AccountHeadLabel'].value == 'level 1'
    // ?  this.COAForm.controls['levelInput'].value 
    // : this.COAForm.controls['AccountHeadLabel'].value == 'level 2'
    //   ? this.COAForm.controls['levelInput'].value == null
    //    ? ''
    //    :this.COAForm.controls['level1'].value + '.' + this.COAForm.controls['levelInput'].value 
    //   : ''; 

      if(this.COAForm.controls['AccountHeadLabel'].value == 'level 1'){
        this.AccountLabelHeadValue = this.COAForm.controls['levelInput'].value ;
      }else if(this.COAForm.controls['AccountHeadLabel'].value == 'level 2'){
         if(this.COAForm.controls['levelInput'].value == null){
          this.AccountLabelHeadValue = '';
         }
         this.AccountLabelHeadValue =  this.COAForm.controls['level1'].value + '.' + this.COAForm.controls['levelInput'].value ;
      }else if(this.COAForm.controls['AccountHeadLabel'].value == 'level 3'){
        if(this.COAForm.controls['levelInput'].value == null){
          this.AccountLabelHeadValue = '';
         }
         this.AccountLabelHeadValue = this.COAForm.controls['level1'].value + '.'+this.COAForm.controls['level2'].value+ '.' + this.COAForm.controls['levelInput'].value ;
      }
  }

  


  


////////////////////////////////show level fields validation ////////////////////////////////////

  ShowLevel() {
    if (this.COAForm.controls['AccountHeadLabel'].value == 'level 1') {
      this.hideLevel1 = false;
      this.hideInputField = true;

    } else if (this.COAForm.controls['AccountHeadLabel'].value == 'level 2') {
      this.hideLevel1 = true;
      this.hideLevel2 = false
      this.hideInputField = true;
    }else if (this.COAForm.controls['AccountHeadLabel'].value == 'level 3') {
      this.hideLevel1 = true;
      this.hideLevel2 = true
      this.hideInputField = true;
    }
    
  }




  //////////////////////////save Button Functtion/////////////////////////////

  Save() {
    if (this.COAForm.controls['CoaTile'].value == "") {
      
      this.msg.WarnNotify('Please Select Coa Title')
      // alert('Please Select CoaTitle Fields')
    } else if (this.COAForm.controls['AccountHeadLabel'].value == "") {
      this.msg.WarnNotify('Please Select Level')
    } else if (this.COAForm.controls['level1'].value == "" &&
      this.COAForm.controls['AccountHeadLabel'].value == "level 2") {
        this.msg.WarnNotify('Please Select Level 1');
    } else if (this.COAForm.controls['levelInput'].value == "" &&
      this.COAForm.controls['AccountHeadLabel'].value != "") {
        this.msg.WarnNotify('Please Enter Level');
    } else if (this.COAForm.controls['HeadTitle'].value == "") {
      this.msg.WarnNotify('Please Enter Head Title');
    } else if (this.COAForm.controls['TransactionAllowed'].value == "") {
      this.msg.WarnNotify('Please Allow Transaction');
      
    }


  }

 //////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////will change the level Input field value if ///////////////////////////
  ////////////////////// value is in minue ///////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  changeValue(val:any){
    // alert(val.target.value);
    if(val.target.value < '0'){
      val.target.value = '';
    }
  }






}
