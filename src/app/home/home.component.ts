import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { ApiService } from '../api.service';
import { MenuService } from '../menu/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private apiService: ApiService,
    private menuService: MenuService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout () {
    this.loginService.loginout();
  }

  backToDvs () {
    this.apiService.companyBackManufacturer().subscribe(() => {
      this.menuService.setMenu('dvs');
      this.router.navigate(['/companyManage'])
    })
  }

}
