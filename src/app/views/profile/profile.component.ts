import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ToasterService } from 'angular2-toaster';
import { ProfileServiceService } from '../../services/profile-service.service';



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
  books: object[] = []




  constructor(private http: HttpService
    , private profileService: ProfileServiceService,
    private toester: ToasterService) {
    //  this.getImage('URL').subscribe(x => this.url = x)
  }


  ngOnInit(): void {
    this.id = localStorage.getItem('_Id')
    this.http.getOneUser(this.id).subscribe(res => {
      this.user = res
      localStorage.setItem('user', JSON.stringify(this.user))
      localStorage.setItem('image', this.user.image)
    }, err => {
      console.log(err);
      console.log(err.error.message);
    }, () => {
      this.user = localStorage.getItem("user");
      this.user = JSON.parse(this.user);
      if (this.user.image != "http://localhost:3000/uploads/users/download.jpeg") {
        this.user.image = "http://localhost:3000/uploads/users/" + this.user.image
      }
      for (let i = 0; i < this.user.addedbooks.length; i++) {
        this.http.getOneBook(this.user.addedbooks[i]).subscribe(res => {
          this.books.push(res);

        }, err => {
          console.log(err);

        })
      }
      this.age = this.profileService.ageCalculated(this.user.age)

      this.isloading = false

    })
    // import user infos 
    this.user = localStorage.getItem("user");
    this.user = JSON.parse(this.user);
  }


  ondelete(id: any ) {
    let person = prompt("Are you Sure you want to delete this Book ?", "If Yes ,Write the your Email ");
    if (person == this.user.email) {
      this.http.deleteBook(id).subscribe(res => {
        console.log(res);
  
      }, err => {
        console.log(err);
  
      })

    } else {
      alert('you have inserted the Wrong adress , please try Again ')
    }

  }


  onedit() {
    this.toester.pop("primary", this.user.pseudo + ' Infos', "Edit profile page ")
  }


}
