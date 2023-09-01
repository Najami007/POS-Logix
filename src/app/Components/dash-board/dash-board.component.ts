import { Component, OnInit } from '@angular/core';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit{
  

  constructor(private globalData :GlobalDataModule){

  }
  
  
  credentials :any;
  ngOnInit(): void {
    this.globalData.setHeaderTitle('DashBoard');
   this.credentials = JSON.parse(localStorage.getItem('curVal') || '{}');

   console.log(this.credentials);

   console.log(atob(atob(this.credentials.value._culName)));
  }




  

}
