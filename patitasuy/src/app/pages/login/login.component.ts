import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  hidePassword: boolean = true;

  formLogin: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  login() {
    const { email, password } = this.formLogin.value;
    this.authService.login(email, password).subscribe({
      next: (resp: any) => {
        if (resp.token) {
          this.router.navigateByUrl('/home');
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    });

  }

}
