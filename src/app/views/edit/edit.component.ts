import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  isloading = true
  user: any
  id: any
  editForm: FormGroup
  constructor(private http: HttpService  ,private  router :Router) { }

  ngOnInit(): void {
    // collecting  id of user connected 
    this.id = localStorage.getItem('_Id')
    console.log(typeof (this.id));
    // get the user connected 
    this.http.getOneUser(this.id).subscribe(res => {
      this.user = res
      localStorage.setItem('user', JSON.stringify(this.user))
      localStorage.setItem('image', this.user.image)

    }, err => {
      console.log(err);
    })
    // import user infos 
    this.user = localStorage.getItem("user");
    this.user = JSON.parse(this.user)
    setInterval(() => {
      this.isloading= false 
    }, 500);


    // setting up the form 
    this.editForm = new FormGroup({
      "firstname": new FormControl(this.user.firstname),
      "lastname": new FormControl(this.user.lastname),
      "age": new FormControl(this.user.age),
      "pseudo": new FormControl(this.user.pseudo),
      "country": new FormControl({ value: this.user.country, disabled: true }),
      "email": new FormControl({ value: this.user.email, disabled: true }),
      "phone": new FormControl(this.user.phone),


    })

  }


  // profile infos changes 
  onsubmit() {
    this.http.updateUser(this.id, this.editForm.value).subscribe(res => {
      console.log(res);
      this.router.navigate(["/profile"])
    }, err => {
      console.log(err);

    })

  }
}
