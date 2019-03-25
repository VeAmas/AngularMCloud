import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyManageComponent } from './company-manage/company-manage.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    CompanyManageComponent,
    MainComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CompanyModule { }
