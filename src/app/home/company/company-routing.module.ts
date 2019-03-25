import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CompanyManageComponent } from './company-manage/company-manage.component';
import { UserTypeGuard } from '../user-type.guard';
import { LoginGuard } from 'src/app/login.guard';

export const companyRoute: Routes = [  
  {path: 'cmp', canActivate: [LoginGuard, UserTypeGuard], children: [
    {
      path: '',
      component: MainComponent
    },
    {
      path: 'companyManage',
      component: CompanyManageComponent
    }
  ]}    
];
