import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

    hidePassword: boolean = true;

    formLogin: FormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
    });

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private userService: UserService
    ) {
    }

    login() {
        const {email, password} = this.formLogin.value;
        this.authService.login(email, password).subscribe({
            next: async (resp: any) => {
                if (resp.token) {
                    console.log("token!")
                    await this.userService.setCurrentUser(resp.user);
                    this.router.navigateByUrl('/home');
                }
            },
            error: (err: any) => {
                alert(err.error.msg);
                console.log(err);
            }
        });

    }

}
