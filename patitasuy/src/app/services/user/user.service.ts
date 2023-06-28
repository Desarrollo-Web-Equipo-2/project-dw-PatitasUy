import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environmentProd } from 'src/app/environments/environment.prod';
import { environment } from 'src/app/environments/environment';
import { User } from 'src/app/interfaces/user';
import { UserResponse } from 'src/app/interfaces/response';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = isDevMode() ? environment.apiUrl : environmentProd.apiUrl;

  constructor(private http: HttpClient ) { }

  getUsers() {
    const url = `${this.apiUrl}/users`;

    return this.http.get(url);
  }

  createUser(user: User) {
    const url = `${this.apiUrl}/users`;
    const body = user;

    return this.http.post<UserResponse>(url, body);
  }

  setCurrentUser(user: User) {
      return Preferences.set({ key: 'user', value: JSON.stringify(user) });
  }

  getCurrentUser() {
      return Preferences.get({ key: 'user' });
  }
}
