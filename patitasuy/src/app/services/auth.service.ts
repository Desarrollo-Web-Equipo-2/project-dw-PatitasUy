import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = environment.apiUrl || 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const body = { email, password };
    return this.http.post<any>(`${this.apiUrl}/auth/login`, body).pipe(
      tap((resp: any) => {
        if(resp.token) {
          Preferences.set({ key: 'Authorization', value: resp.token });
        }
      }
    ));
  }

  logout() {
    Preferences.remove({key: 'Authorization'});
    Preferences.remove({key: 'user'});
  }
}

