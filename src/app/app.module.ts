import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/Navigation/header/header.component';
import { SideNavbarComponent } from './Components/Navigation/side-navbar/side-navbar.component';
import { VoucherformComponent } from './Components/voucherform/voucherform.component';
import { CoaformComponent } from './Components/coaform/coaform.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DashBoardComponent } from './Components/dash-board/dash-board.component';
import { LedgerComponent } from './Reports/ledger/ledger.component';
import { TrialBalanceComponent } from './Reports/trial-balance/trial-balance.component';
import { PlstatComponent } from './Reports/plstat/plstat.component';
import { BsstatComponent } from './Reports/bsstat/bsstat.component';
import { ToastrModule } from 'ngx-toastr';
import { MainPageComponent } from './Components/main-page/main-page.component';
// import { FilterPipe } from './Shared/pipes/filter.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LoginComponent } from './login/login.component';
import { PartyComponent } from './Components/party/party.component';
import { Subject } from 'rxjs/internal/Subject';
import { GlobalDataModule } from './Shared/global-data/global-data.module';
import { AddUserComponent } from './Components/add-user/add-user.component';
import { HttpClientModule } from '@angular/common/http';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SettingsComponent } from './Components/settings/settings.component';
import { CityComponent } from './Components/settings/city/city.component';
import { MaterialModule } from './Shared/material/material.module';
import { AddcityformComponent } from './Components/settings/city/addcityform/addcityform.component';
import { ProductCategoryComponent } from './Components/settings/product-category/product-category.component';
import { AddProductCategoryComponent } from './Components/settings/product-category/add-product-category/add-product-category.component';
import { ProductSubcategoryComponent } from './Components/settings/product-subcategory/product-subcategory.component';
import { AddProductSubcategoryComponent } from './Components/settings/product-subcategory/add-product-subcategory/add-product-subcategory.component';
import { ProductComponent } from './Components/product/product.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavbarComponent,
    VoucherformComponent,
    CoaformComponent,
    DashBoardComponent,
    LedgerComponent,
    TrialBalanceComponent,
    PlstatComponent,
    BsstatComponent,
    MainPageComponent,
    LoginComponent,
    PartyComponent,
    AddUserComponent,
    SettingsComponent,
    CityComponent,
    AddcityformComponent,
    ProductCategoryComponent,
    AddProductCategoryComponent,
    ProductSubcategoryComponent,
    AddProductSubcategoryComponent,
    ProductComponent,
    // FilterPipe,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ToastrModule.forRoot(), 
    Ng2SearchPipeModule,
    GlobalDataModule,
    HttpClientModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
    MatProgressBarModule,
    NgxMatSelectSearchModule,
    MaterialModule
  

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 


}
