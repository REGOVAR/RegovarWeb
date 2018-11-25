import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HTTP_INTERCEPTORS,
  HttpErrorResponse
} from '@angular/common/http';

import { of } from 'rxjs';
import { mergeMap, materialize, dematerialize, delay } from 'rxjs/operators';

import { db } from '../helpers/fake-db';

interface Route {
  regex: string;
  method: string;
  status: number;
  body?: any;
}

function snakeToCamel(name: string) {
    return name.replace(/(\-\w)/g, m => m[1].toUpperCase());
  }

function getMethodName(name: string) {
    const method = `get${name.charAt(0).toUpperCase() + name.slice(1)}`;
    return snakeToCamel(method);
  }

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  createRoute(request: HttpRequest<any>, route: Route) {
    const { regex, method, status, body } = route;
    const regExp = new RegExp(regex);
    const result = request.url.match(regex);

    if (result && request.method === method) {
      return of(
        new HttpResponse({
          status,
          body
        })
      );
    }

    return null;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of(null).pipe(
      mergeMap(() => {

        console.log("Fake interception : " + request.url);
        let regex: RegExp;
        let result: RegExpMatchArray;

        if (request.url.endsWith('/user/login') && request.method === 'POST') {
          if ('admin' === request.body.login && 'admin' === request.body.password) {
            return of(new HttpResponse({ status: 200, body: db.loginSuccess() }));
          } else {
            // else return 400 bad request
            return observableThrowError('Login or password is incorrect');
          }
        }

        return next.handle(request);
      }),
      materialize(),
      delay(0),
      dematerialize()
    );
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
