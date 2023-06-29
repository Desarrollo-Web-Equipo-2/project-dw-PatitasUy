import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { User } from 'src/app/interfaces/user';
import { UserResponse } from 'src/app/interfaces/response';
import { Preferences } from '@capacitor/preferences';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private apiUrl: string = environment.apiUrl + 'users/';

    constructor(private http: HttpClient) {
    }

    getUsers() {
        return this.http.get(this.apiUrl);
    }

    createUser(user: User) {
        return this.http.post<UserResponse>(this.apiUrl, user);
    }

    setCurrentUser(user: User) {
        return Preferences.set({ key: 'user', value: JSON.stringify(user) });
    }

    getCurrentUser() {
        return Preferences.get({ key: 'user' });
    }
}
