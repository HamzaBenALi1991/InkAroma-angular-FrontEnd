import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ToasterService } from 'angular2-toaster';
import { ProfileServiceService } from '../../services/profile-service.service';
import { Observable, observable, Subject } from 'rxjs';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // origin that works
  id: any
  isloading = true
  user: any
  age: any




  constructor(private http: HttpService
    , private profileService: ProfileServiceService,
    private toester: ToasterService) {
    //  this.getImage('URL').subscribe(x => this.url = x)
  }


  ngOnInit(): void {
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

    setTimeout(() => {
      if (this.user.image != "http://localhost:3000/uploads/users/download.jpeg") {
        this.user.image = "http://localhost:3000/uploads/users/" + this.user.image

      } 



      this.age = this.profileService.ageCalculated(this.user.age)
      this.isloading = false
    }, 2000);
  }
  onedit() {
    this.toester.pop("primary", this.user.pseudo + ' Infos', "Edit profile page ")
  }
  

}
