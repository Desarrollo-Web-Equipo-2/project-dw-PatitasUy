import { Component, ContentChild, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  hidePassword: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  login() { }

}
