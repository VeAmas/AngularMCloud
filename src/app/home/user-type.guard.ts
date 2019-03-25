import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MenuService } from '../menu/menu.service';

@Injectable({
  providedIn: 'root'
})
export class UserTypeGuard implements CanActivate {
  constructor (
    private router: Router,
    private menuService: MenuService
  ) {}

  canActivate (
    next: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): boolean {
    let result = (this.menuService.type === 'dvs') === (state.url.indexOf('/cmp') !== 0);
    if (!result) {
      this.router.navigate([this.menuService.type === 'dvs' ? '/' : '/cmp/'])
    }
    // console.log(state.url, this.menuService.type, result, this.router);
    return result
  }
}
