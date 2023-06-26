import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
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
