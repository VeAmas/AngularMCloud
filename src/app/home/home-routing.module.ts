import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { LoginGuard } from '../login.guard';
import { MainComponent } from './main/main.component';
import { CompanyManageComponent } from './company-manage/company-manage.component';

import { companyRoute } from './company/company-routing.module'
import { UserTypeGuard } from './user-type.guard';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [LoginGuard, UserTypeGuard], children: [
    {
      path: '',
      component: MainComponent
    },
    {
      path: 'companyManage',
      component: CompanyManageComponent
    },
    ...companyRoute
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
