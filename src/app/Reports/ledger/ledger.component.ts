import { animate } from '@angular/animations';
import { Component, ElementRef, OnInit ,ViewChild} from '@angular/core';
import {FormControl } from '@angular/forms';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import * as $ from 'jquery';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss']
})
export class LedgerComponent {

  date = new FormControl(new Date());

  constructor( private globalData: GlobalDataModule) { }

  ngOnInit(): void {
    this.getTotal();
    this.globalData.setHeaderTitle('Ledger');
  }

  CoaHeads= [{name:'Salaries'},
  {name:'Wages'},
  {name:'Stationary'},
  {name:'Fixed Asset'},
  {name:'Current Asset'},
  {name:'Current Liability'},
  {name:'Capital'},
  {name:'Income'},]

  tableData = [
  {date:'21-Aug-2023',party:'ABC',nar:'Narration',debit:10000,credit:20,},
  {date:'21-Aug-2023',party:'ABC',nar:'Narration',debit:10,credit:20,},
  {date:'21-Aug-2023',party:'ABC',nar:'Narration',debit:10,credit:20,},
  {date:'21-Aug-2023',party:'ABC',nar:'Narration',debit:10,credit:20,},
  {date:'21-Aug-2023',party:'ABC',nar:'Narration',debit:10,credit:20,},
  {date:'21-Aug-2023',party:'ABC',nar:'Narration',debit:10,credit:20,},
  {date:'21-Aug-2023',party:'ABC',nar:'Narration',debit:10,credit:20,},
  {date:'21-Aug-2023',party:'ABC',nar:'Narration',debit:10,credit:20,},
  {date:'21-Aug-2023',party:'ABC',nar:'Narration',debit:10,credit:20,},
  {date:'21-Aug-2023',party:'ABC',nar:'Narration',debit:10,credit:20,},
  {date:'21-Aug-2023',party:'ABC',nar:'Narration',debit:10,credit:20,},
  {date:'21-Aug-2023',party:'ABC',nar:'Narration',debit:10,credit:20,},
 ]
 placholder = 'Search...';
 txtSearch = '';
 curDate = new Date();


 ////////////////////////getting total of debit and credit Sides///////////
 debitTotal=0;
 creditTotal=0;
    getTotal(){
      for(var i=0;i<this.tableData.length;i++){
        this.debitTotal += this.tableData[i].debit;
        this.creditTotal += this.tableData[i].credit;
      }
    }
  
  alertthis(){
    alert();
  }

  PrintTable() {
    let printContents = $('#printDiv').html();
    var frame1 : any = $('<iframe />');
        frame1[0].name = "frame1";
        frame1.css({ "position": "absolute", "top": "-1000000px" });
        $("body").append(frame1);
        var frameDoc = frame1[0].contentWindow 
        ? frame1[0].contentWindow 
        : frame1[0].contentDocument.document 
          ? frame1[0].contentDocument.document 
          : frame1[0].contentDocument;
        frameDoc.document.open();
       
        //Create a new HTML document.
        frameDoc.document.write('<html><head><title>DIV Contents</title>');
        frameDoc.document.write('</head><body>');

        //Append the external CSS file.
        // frameDoc.document.write('<style><link rel="stylesheet" href="src/styles.css" /></style>');
         frameDoc.document.write(
          //'<style>.rptTable { width: 100%; margin-left: 15px; background-color: rgb(252, 242, 242); } .rptTable th { border: 1px solid black; font-size: 15px; font-weight: bold;  } .rptTable td { border: 1px solid black; font-size: 12px; }</style>'
          '<link rel="stylesheet" type="text/css" href="../../../assets/style/ownStyle.css" />'
          +
          '<link rel="stylesheet" type="text/css" href="../../../assets/style/bootstrap.min.css" />'
          );

        //Append the DIV contents.
        frameDoc.document.write(printContents);
        frameDoc.document.write('</body></html>');
        frameDoc.document.close();
        setTimeout(function () {
            window.frames[0].focus();
            window.frames[0].print();
            frame1.remove();
        }, 500);

    
  }



}
