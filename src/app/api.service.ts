import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';

interface Response {
  data: any,
  info: string,
  success: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private nzMessageService: NzMessageService
  ) { }

  post<T> (url: string, param?: any): Observable<T> {
    // post请求默认返回Response类
    return this.http.post<Response>(url, param)
      .pipe(map<Response, T>(res => { // 通过pipe中的map方法转换为T类型
        if (!res.success) { // 如果请求失败则抛出异常
          this.nzMessageService.error(res.info)
          throw new Error(res.info)
        }
        return res.data
      }))
  }
  get<T> (url: string, param?: any): Observable<any> {
    return this.http.get<Response>(url, param)
  }


  login<T> (param): Observable<T> {
    return this.post<T>('/api/common/login', param)
  }
  companyManageGetCompanyList<T> (param): Observable<T> {
    return this.post<T>('/api/companyManage/getCompanyList', param)
  }
  companyManageCustomerLogin<T> (param): Observable<T> {
    return this.post<T>('/api/companyManage/customerLogin', param)
  }
  companyBackManufacturer<T> (): Observable<T> {
    return this.post<T>('/api/common/backManufacturer')
  }
  addCompany<T> (param): Observable<T> {
    return this.post<T>('/api/companyManage/addCompany', param)
  }
  
}
