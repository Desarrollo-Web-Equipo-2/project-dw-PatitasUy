import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

    constructor(private authService: AuthService,
                private router: Router) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise<boolean> {
        return new Promise((resolve) => {
            this.authService.isValidToken().then((res) => {
                resolve(res);
            }).catch(() => {
                resolve(false);
                this.router.navigate(['/login']);
            });
        });
    }

}
