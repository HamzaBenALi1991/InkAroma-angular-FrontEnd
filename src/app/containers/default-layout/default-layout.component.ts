import { Component, OnDestroy, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { ProfileServiceService } from '../../services/profile-service.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  // hamza-dev variables 
  id: any
  user: any
  isloading= true
  

  constructor(private profileService: ProfileServiceService, private http: HttpService, private auth: AuthServiceService, private router: Router, @Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }


  ngOnInit() {
    this.isloading= true    
    // origin that works end here 
    this.id = localStorage.getItem('_Id')
    this.http.getOneUser(this.id).subscribe(res => {
      this.user = res
      localStorage.setItem('user', JSON.stringify(this.user))
      localStorage.setItem('image', this.user.image)
    }, err => {
      console.log(err);
      console.log(err.error.message);

    })
    // import user infos 
    this.user = localStorage.getItem("user");
    this.user = JSON.parse(this.user);

    setTimeout(async() => {
      if (this.user.image != "http://localhost:3000/uploads/users/download.jpeg") {
        this.user.image = "http://localhost:3000/uploads/users/" + this.user.image
      }
      this.isloading=false 
      }, 700);
      
      
  }
  ngOnDestroy(): void {
    this.changes.disconnect();
  }
  logout() {
    this.auth.logout()
    this.router.navigate(["/login"])

  }
}
