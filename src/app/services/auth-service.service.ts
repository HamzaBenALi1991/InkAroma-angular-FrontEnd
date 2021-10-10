import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }
// login and sending token to localstorage 
  logIn(token: any) {
    localStorage.setItem('token', token)
  }
  // check if token exist or existed ? 
  isAuth() {
    const data = localStorage.getItem('token')
    if (data != null) {
      return true
    } else {
      return false
    }
  }
}
