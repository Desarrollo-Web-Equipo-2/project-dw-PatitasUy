import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, from, mergeMap } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const tokenPromise = Preferences.get({ key: 'Authorization' });

    return from(tokenPromise).pipe(
      mergeMap(token => {
        if (!token) {
          return next.handle(req);
        }

        const cloned = req.clone({
          headers: req.headers.set('Authorization', token.value!)
        });

        return next.handle(cloned);
      }
      )
    );
  }
}
