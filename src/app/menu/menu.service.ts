import { Injectable } from '@angular/core';

interface Menu {
  url: string,
  name: string
}

const menuDvs:Array<Menu> = [{
  url: '/',
  name: 'main'
}, {
  url: '/companyManage',
  name: 'company',
}];
const menuCompany:Array<Menu> = [{
  url: '/cmp',
  name: 'main'
}, {
  url: '/cmp/companyManage',
  name: 'company',
}];


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  type: string

  getMenuList (): Array<Menu> {
    return this.type === 'dvs' ? menuDvs : menuCompany;
  }

  setMenu (type: string) {
    this.type = type;
    window.sessionStorage.setItem('menuType', type);
  }

  constructor() { 
    this.type = window.sessionStorage.getItem('menuType') || 'dvs';
  }

  
}
