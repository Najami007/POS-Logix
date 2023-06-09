import { Component, OnInit } from '@angular/core';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';

@Component({
  selector: 'app-bsstat',
  templateUrl: './bsstat.component.html',
  styleUrls: ['./bsstat.component.scss']
})
export class BsstatComponent implements OnInit {
  constructor(private globalData: GlobalDataModule){

  }
  ngOnInit(): void {
    this.globalData.setHeaderTitle('Balance Sheet');
  }

}
