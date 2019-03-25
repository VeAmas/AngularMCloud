import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor (
    private loginService: LoginService,
    private router: Router
  ) {}

  canActivate (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log("text...");

    
    return this.checkLogin();
  }

  checkLogin () {
    if (this.loginService.checkLogin()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
