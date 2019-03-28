import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { CompanyManageComponent } from './company-manage/company-manage.component';
import { CompanyModule } from './company/company.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CompanyManageComponent
  ],
  imports: [
    CommonModule,
    CompanyModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    NgZorroAntdModule
  ]
})
export class HomeModule { }
