import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {

  constructor(
    private menuService: MenuService,
    private router: Router
  ) { }

  ngOnInit() {
  }

}
