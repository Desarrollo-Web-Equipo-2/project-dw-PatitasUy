import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = environment.apiUrl + '/auth';

  constructor(private http: HttpClient) {
  }

  isValidToken() {
    return this.http.get<boolean>(this.apiUrl + '/isValidToken');
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

  logout() {
    Preferences.remove({ key: 'Authorization' });
    Preferences.remove({ key: 'user' });
  }
}

