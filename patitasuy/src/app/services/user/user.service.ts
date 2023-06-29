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

  constructor(private http: HttpClient) { }

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


  async setNewUserDates(name: String, email: String) {
    console.log("LLEGASERVICE");
    const result = await this.getCurrentUser();
    const user: User = JSON.parse((result).value!);
    const userId = user.user_id;

    const url = `http://localhost:3000/api/users/edit/${userId}`;
    const body = { name, email, userId };
    
    return this.http.post<UserResponse>(url, body);
  }
}
