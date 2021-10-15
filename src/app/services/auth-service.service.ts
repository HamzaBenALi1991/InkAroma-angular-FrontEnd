import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpService) { }

  // login and sending token to localstorage 
  logIn(token: any,Id :any)  {
    localStorage.setItem('token', token);
    localStorage.setItem('_Id', Id);


  }
  logout() {
    localStorage.clear()
  }

  ageCalculated (data :any){
    let timeDiff = Math.abs(Date.now() - new Date(data).getTime());
    let agee = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    return agee 
  }


}
