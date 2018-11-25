import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUser: ""

  constructor() { }


  do()
  {
    console.log("Super !")
  }
}
