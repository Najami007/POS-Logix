import { Component, OnInit } from '@angular/core';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit{

  constructor(private globalData :GlobalDataModule){

  }

  ngOnInit(): void {
    this.globalData.setHeaderTitle('DashBoard');
  }

}
