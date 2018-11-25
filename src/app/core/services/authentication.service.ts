import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrentUser } from '../models/current-user';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authUrl = 'http://dev.regovar.org/user/login';
  private sessionTokenName = 'currentUser';

  public redirectUrl: string;
  currentUser : CurrentUser = null;


  constructor(private http: HttpClient) { 
    const currentUser = JSON.parse(sessionStorage.getItem(this.sessionTokenName));
    if (currentUser) {
      this.setCurrentUser({
        login: currentUser.login,
        role: <string>currentUser.role, //Role[<string>currentUser.role],
        token: currentUser.token
      });
    }


  }


  do()
  {
    console.log("Super !")
  }


  login(login: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const options = { headers };

    return this.http.post(this.authUrl, { "login": login, "password": password }, options).pipe(
      map(response => {
        console.log(response);
        const token = response && response['token'];
        const role = response && response['role'];

        if (token) {
          this.setCurrentUser({ login, role, token });

          // SESSION STORAGE
          sessionStorage.setItem(this.sessionTokenName, JSON.stringify({ login, role, token }));

          //this.layoutService.showDrawer();

          return true;
        } else {
          return false;
        }
      })
    );
  }

  logout() {
    this.destroyCurrentUser();
  }

  setCurrentUser({ login, role, token }: { login: string; role: string; token: string }) {
    this.currentUser = new CurrentUser(login, role, token);
  }

  destroyCurrentUser() {
    this.currentUser = null;
    sessionStorage.removeItem(this.sessionTokenName);
  }

  getAuthorizationHeader(): string {
    return `Bearer ${this.currentUser.token}`;
  }

  getToken(): string {
    return this.currentUser.token;
  }
}
