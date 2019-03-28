import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { MenuService } from '../menu/menu.service';
import { ApiService } from '../api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    private api: ApiService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      remember: [ true ]
    });
  }
  
  validateForm: FormGroup;
  
  login(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }

    
    this.api.login<loginData>({
      username: this.validateForm.value.userName, 
      password: this.validateForm.value.password
    }).subscribe({
      next: (data) => {
        if (data.uniqueCode === 0) {
          this.menuService.setMenu('dvs');
        } else {
          this.menuService.setMenu('company');
        }      
        this.loginService.login()
      },
      error (error) {
        console.log(error)
      }
    })
  }


}
