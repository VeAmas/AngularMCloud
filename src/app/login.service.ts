import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from './menu/menu.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isLogined: boolean

  constructor(
    private menuService: MenuService,
    private router: Router
  ) { 
    this.isLogined = window.sessionStorage.getItem('logined') !== null
  }

  login () {
    this.isLogined = true;
    let url = this.menuService.type === 'dvs' ? '/' : '/cmp/';
    window.sessionStorage.setItem('logined', new Date().getTime() + '');
    this.router.navigate([url]);
  }

  loginout () {
    this.isLogined = false;
    window.sessionStorage.removeItem('logined')
    this.router.navigate(['/login']);
  }

  checkLogin (): boolean {
    return this.isLogined;
  }
}
