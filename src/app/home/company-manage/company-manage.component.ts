import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { pagedData } from 'src/app/commonDataType';
import { MenuService } from 'src/app/menu/menu.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { Observable, Observer, timer, of } from 'rxjs';
import { switchMap, finalize } from 'rxjs/operators';

interface Company {
  accessibleMachines: Array<Machine>,
  contact: string,
  createTime: number,
  email: string,
  id: number,
  latitude: string,
  location: string,
  longitude: string,
  name: string,
  receiveAlarmEmail: string,
  receiveAlarmMessage: string,
  status: number,
  telephone: string
}

interface Machine {
  bindStatus: number, 
  factoryId: number, 
  machineCode: string, 
  machineId: number, 
  writable: boolean
}


@Component({
  selector: 'app-company-manage',
  templateUrl: './company-manage.component.html',
  styleUrls: ['./company-manage.component.less']
})
export class CompanyManageComponent implements OnInit {

  param = {
    searchName: ''
  }
  companyListLoading: Boolean;
  companyList: Array<Company> = []
  pagination = {
    total: 0,
    currentPage: 1,
    pageSize: 10
  }

  constructor(
    private apiService: ApiService,
    private menuService: MenuService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getData();




    of(1).pipe(finalize(() => console.log('Finally callback'))).subscribe(v => console.log(v))
  }

  getData () {
    this.companyListLoading = true;
    this.apiService.companyManageGetCompanyList<pagedData<Company>>({name: this.param.searchName}).subscribe(data => {
      console.log(data);
      this.companyList = data.list;
      this.companyListLoading = false;
      this.pagination.total = data.count;
    })
  }

  enterCompany (company: Company) {
    
    this.apiService.companyManageCustomerLogin(company.id).subscribe(() => {
      this.menuService.setMenu('company');
      this.router.navigate(['/cmp'])
    })
  }

  
  addCompanyRoles = {
    companyAsyncValidator (control: FormControl):Observable<ValidationErrors | null> {
      // 延时500ms之后开始判断
      return timer(500).pipe(switchMap(() => {
        // 返回一个Observable
        return Observable.create((observer: Observer<ValidationErrors | null>) => {
          // 向后台发送请求来判断是否重复
          console.log("text...");        
          setTimeout(() => {
            if (control.value === 'kongtrolink') {
              observer.next({ error: true, duplicated: true });
            } else {
              observer.next(null)
            }
            observer.complete();
          }, 1000);
        })
      }))
    },
    companyNameLengthValidator (control: FormControl): ValidationErrors | null {
      const str = control.value || ''
      const length = str.length + (str.match(/[^ -~]/g) || '').length
      // 非ascii以及英文字母
      if (!/^([^\x00-\x7F]|[A-Za-z])*$/.test(control.value)) {
        return { error: true, typeError: true }
      } else if (length > 50) {
        return { error: true, lengthExceeded: true }
      } else {
        return null
      }
    },
    latitudeValidator (control: FormControl): ValidationErrors | null {
      if (control.value && !/^((\+)?([0-6]?\d\.\d{1,6}|[0-6]?\d|7[0-4]\.\d{1,6}|7[0-4]|75\.0{1,6}|75)|-([1-4]?\d\.\d{1,6}|[1-4]?\d|5[0-3]\.\d{1,6}|5[0-3]|54\.0{1,6}|54))$/.test(control.value)) {
        return { error: true, typeError: true }
      } else {
        return null
      }
    },
    longitudeValidator (control: FormControl): ValidationErrors | null {
      if (control.value && !/^(-)?(([1-9]?[0-9]|1[0-7][0-9])(\.[0-9]{1,6})?)$/.test(control.value)) {
        return { error: true, typeError: true }
      } else {
        return null
      }
    },
    phoneValidator (control: FormControl): ValidationErrors | null {
      if (control.value && !/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(control.value)) {
        return { error: true, typeError: true }
      } else {
        return null
      }
    },
    emailValidator (control: FormControl): ValidationErrors | null {
      if (control.value && !/^[\w-]+(.[\w-]+)+@[\w-]+(.[\w-]+)+$/.test(control.value)) {
        return { error: true, typeError: true }
      } else {
        return null
      }
    },
  }
  
  addCompany = {
    show: false,
    companyNameLength: 0,
    form: this.fb.group({
      name: ['', [Validators.required, this.addCompanyRoles.companyNameLengthValidator], [this.addCompanyRoles.companyAsyncValidator]],
      contact: ['', [Validators.required]],
      email: ['', [Validators.required, this.addCompanyRoles.emailValidator]],
      latitude: ['', [Validators.required, this.addCompanyRoles.latitudeValidator]],
      location: ['', [Validators.required]],
      longitude: ['', [Validators.required, this.addCompanyRoles.longitudeValidator]],
      receiveAlarmEmail: [false, [Validators.required]],
      receiveAlarmMessage: [false, [Validators.required]],
      telephone : ['', [Validators.required, this.addCompanyRoles.phoneValidator]],
    }),
    toModal () {
      this.show = true;
    },
    execute: () => {
      this.apiService.addCompany(this.addCompany.form.value).pipe(
        finalize(() => {
          this.addCompany.clear();
        })
      ).subscribe({
        next: () => {
          this.getData();
        },
        error: () => { }
      })
    },
    clear () {
      this.form.reset();
      this.companyNameLength = 0;
      this.show = false;
    },
    onCompanyNameChange () {
      let length = this.form.value.name.length + (this.form.value.name.match(/[^ -~]/g) || '').length
      this.companyNameLength = length;
    }
  }

}
