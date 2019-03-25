import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { MenuService } from '../menu/menu.service';
import { ApiService } from '../api.service';

interface loginData {
  id: number,
  name: string,
  roleId: number,
  roleName: string,
  uniqueCode: number,
  userType: number,
  username: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private menuService: MenuService,
    private api: ApiService
  ) { }

  ngOnInit() {
  }

  login () {
    this.api.login<loginData>({username: 'toDelete', password: '123456'}).subscribe(data => {
      if (data.uniqueCode === 0) {
        this.menuService.setMenu('dvs');
      } else {
        this.menuService.setMenu('company');
      }      
      this.loginService.login()
    })
  }
}
