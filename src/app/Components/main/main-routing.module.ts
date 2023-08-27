import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainModule } from './main.module';
import { CoaformComponent } from '../coaform/coaform.component';
import { DashBoardComponent } from '../dash-board/dash-board.component';
import { VoucherformComponent } from '../voucherform/voucherform.component';
import { LedgerComponent } from 'src/app/Reports/ledger/ledger.component';
import { TrialBalanceComponent } from 'src/app/Reports/trial-balance/trial-balance.component';
import { PlstatComponent } from 'src/app/Reports/plstat/plstat.component';
import { BsstatComponent } from 'src/app/Reports/bsstat/bsstat.component';
import { MainPageComponent } from '../main-page/main-page.component';
import { PartyComponent } from '../party/party.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { SettingsComponent } from '../settings/settings.component';
import { ProductComponent } from '../product/product.component';
import { SaleComponent } from '../sale/sale.component';
import { PurchaseComponent } from '../purchase/purchase.component';
import { BankComponent } from '../bank/bank.component';
import { OwnerProfileComponent } from '../owner-profile/owner-profile.component';
import { ShopComponent } from '../shop/shop.component';
import { MapShopComponent } from '../map-shop/map-shop.component';
import { MallSaleComponent } from '../mall-sale/mall-sale.component';
import { ShopBillComponent } from '../shop-bill/shop-bill.component';
import { ShopsReportComponent } from 'src/app/Reports/shops-report/shops-report.component';
import { OwnersReportComponent } from 'src/app/Reports/owners-report/owners-report.component';
import { BillRptShopwiseComponent } from 'src/app/Reports/bill-rpt-shopwise/bill-rpt-shopwise.component';



const routes: Routes = [
  {path:'',component:MainPageComponent, children:[
    {path:'dashBoard', component:DashBoardComponent },
  { path: 'coa', component: CoaformComponent },
  {path:'voucher', component: VoucherformComponent},
  {path:'ldgrpt', component: LedgerComponent},
  {path:'tbrpt', component: TrialBalanceComponent},
  {path:'plrpt', component: PlstatComponent},
  {path:'bsrpt', component: BsstatComponent},
  {path:'party', component: PartyComponent},
  {path:'AddUser', component: AddUserComponent},
  {path:'Settings',component:SettingsComponent},
  {path:'product',component:ProductComponent},
  {path:'sale',component:SaleComponent},
  {path:'purchase',component:PurchaseComponent},
  {path:'bank',component:BankComponent},
  {path:'OwnerProfile',component:OwnerProfileComponent},
  {path:'shop',component:ShopComponent},
  {path:'mapshop',component:MapShopComponent},
  {path:'shopBill',component:ShopBillComponent},
  {path:'srptl',component:ShopsReportComponent},
  {path:'orptl',component:OwnersReportComponent},
  {path:'BRptSW',component:BillRptShopwiseComponent},

  {path:'', redirectTo:'/main/dashBoard',pathMatch:'full'}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
