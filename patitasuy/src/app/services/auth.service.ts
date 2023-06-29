import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { ApiService } from './api/api.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiRoute = 'auth';
    private readonly apiUrl = environment.apiUrl + '/' + this.apiRoute;

    constructor(private http: HttpClient,
                private apiService: ApiService) {
    }

    login(email: string, password: string) {
        const body = { email, password };
        return this.http.post<any>(`${this.apiUrl}/login`, body).pipe(
            tap((resp: any) => {
                    if (resp.token) {
                        Preferences.set({ key: 'Authorization', value: resp.token });
                    }
                }
            ));
    }

    isValidToken() {
        return this.apiService.get<boolean>(this.apiRoute + '/isValidToken');
    }

}

