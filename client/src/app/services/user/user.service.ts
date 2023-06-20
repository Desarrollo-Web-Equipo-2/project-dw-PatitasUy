import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environmentProd } from 'src/app/environments/environment.prod';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = isDevMode() ? environment.apiUrl : environmentProd.apiUrl;

  constructor(private http: HttpClient ) { }

  createUser(user: any): Observable<any> {
    
  }
}
