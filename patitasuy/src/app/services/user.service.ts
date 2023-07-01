import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/interfaces/user';
import { UserResponse } from 'src/app/interfaces/response';
import { Preferences } from '@capacitor/preferences';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private readonly apiUrl: string = environment.apiUrl + '/users';

    private user$ = new BehaviorSubject<User | null>(null);

    constructor(private http: HttpClient) {
        Preferences.get({ key: 'user' }).then((res) => {
            if (res) {
                this.user$.next(JSON.parse(res.value!));
            }
        });
    }

    createUser(user: User) {
        return this.http.post<UserResponse>(this.apiUrl, user);
    }

    async setCurrentUser(user: User): Promise<void> {
        await Preferences.set({ key: 'user', value: JSON.stringify(user) });
        this.user$.next(user);
    }

    getCurrentUser(): Promise<User | undefined> {
        return new Promise((resolve) => {
            Preferences.get({ key: 'user' }).then((res) => {
                if (res) {
                    resolve(JSON.parse(res.value!));
                } else {
                    resolve(undefined);
                }
            });
        });
    }

    setNewUserData(name: string, email: string, id: number) {
        const url = `${this.apiUrl}/${id}`;
        const body = { name, email, id };
        return this.http.put<User>(url, body);
    }
}
