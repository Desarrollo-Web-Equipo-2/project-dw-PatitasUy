import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/interfaces/user';
import { UserResponse } from 'src/app/interfaces/response';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl + '/users';

  constructor(private http: HttpClient) { }

  getUsers() {

    return this.http.get(this.apiUrl);
  }

  createUser(user: User) {
    const body = user;

    return this.http.post<UserResponse>(this.apiUrl, body);
  }

  setCurrentUser(user: User) {
    return Preferences.set({ key: 'user', value: JSON.stringify(user) });
  }

  getCurrentUser() {
    return Preferences.get({ key: 'user' });
  }


  async setNewUserDates(name: string, email: string) {

    console.log("LLEGASERVICE");
    const result = await this.getCurrentUser();
    const user: User = JSON.parse((result).value!);
    const id = user.user_id;

    const url = `${this.apiUrl}/${id}`;
    console.log(url);

    const body = { name, email, id };

    return this.http.put<UserResponse>(url, body);
  }
}
