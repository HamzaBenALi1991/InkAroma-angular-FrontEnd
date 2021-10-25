import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router :Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token')
    if (token) {
      const isAdmin = this.checkIfAdmin(token)
      if (isAdmin) {
        return true 
      } else {
        this.router.navigate(["/library"])
        return false
      }
    } else {
      this.router.navigate(["/library"])
        return false
    }


  }
  checkIfAdmin(token: any) {
    Boolean
    const decoded: any = jwt_decode(token);
    if (decoded.email == "testforhamza@gmail.com") {
      return true
    }

  }

}
