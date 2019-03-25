import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

interface Response {
  data: any,
  info: string,
  success: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  post<T> (url: string, param?: any): Observable<T> {
    return this.http.post<Response>(url, param).pipe<T>(map(res => res.data))
  }
  get<T> (url: string, param?: any): Observable<any> {
    return this.http.get<Response>(url, param)
  }

  constructor(
    private http: HttpClient
  ) { }

  login<T> (param): Observable<T> {
    return this.post<T>('/api/common/login', param)
  }
}
