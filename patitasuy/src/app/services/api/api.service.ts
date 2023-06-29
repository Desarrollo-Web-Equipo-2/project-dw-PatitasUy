import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private readonly apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    get<T>(path: string, options?: any): Promise<T> {
        return new Promise((resolve, reject) => {
            Preferences.get({ key: 'Authorization' }).then((token) => {
                if (!token) {
                    reject({ msg: 'Invalid token! Please login again' });
                    return;
                }
                this.http.get<T>(`${this.apiUrl}/${path}`, {
                    ...options,
                    headers: new HttpHeaders().append('Authorization', token.value!)
                }).subscribe({
                    next: (resp) => {
                        resolve(resp as T);
                    },
                    error: (err) => {
                        reject(err);
                    }
                })
            });
        });
    }

    put<T>(path: string, body?: any, options?: any): Promise<T> {
        return new Promise((resolve, reject) => {
            Preferences.get({ key: 'Authorization' }).then((token) => {
                if (!token) {
                    reject({ msg: 'Invalid token! Please login again' });
                    return;
                }
                this.http.put<T>(`${this.apiUrl}/${path}`, body, {
                    ...options,
                    headers: new HttpHeaders().append('Authorization', token.value!)
                }).subscribe({
                    next: (resp) => {
                        resolve(resp as T);
                    },
                    error: (err) => {
                        reject(err);
                    }
                })
            });
        });
    }

    post<T>(path: string, body?: any, options?: any): Promise<T> {
        return new Promise((resolve, reject) => {
            Preferences.get({ key: 'Authorization' }).then((token) => {
                if (!token) {
                    reject({ msg: 'Invalid token! Please login again' });
                    return;
                }
                this.http.post<T>(`${this.apiUrl}/${path}`, body, {
                    ...options,
                    headers: new HttpHeaders().append('Authorization', token.value!)
                }).subscribe({
                    next: (resp) => {
                        resolve(resp as T);
                    },
                    error: (err) => {
                        reject(err);
                    }
                })
            });
        });
    }


}
