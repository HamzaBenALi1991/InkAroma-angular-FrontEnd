import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http :HttpService) { }
// login and sending token to localstorage 
  logIn(token: any) {
    localStorage.setItem('token', token)
  }
  logout(){
    localStorage.clear() 
  }
 
}
