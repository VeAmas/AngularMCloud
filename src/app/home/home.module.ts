import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { CompanyManageComponent } from './company-manage/company-manage.component';
import { CompanyModule } from './company/company.module';

@NgModule({
  declarations: [
    CompanyManageComponent
  ],
  imports: [
    CommonModule,
    CompanyModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
