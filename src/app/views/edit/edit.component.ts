import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
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
  editpass: FormGroup
  toggle = false
  pass = ''



  constructor(private http: HttpService,
    private router: Router,
    private toaster: ToasterService) { }

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
    this.user = JSON.parse(this.user);
    setInterval(() => {
      this.isloading = false
    }, 500);


    // setting up the form 
    this.editForm = new FormGroup({
      "firstname": new FormControl(this.user.firstname, Validators.required),
      "lastname": new FormControl(this.user.lastname, Validators.required),
      "age": new FormControl(this.user.age),
      "pseudo": new FormControl(this.user.pseudo, Validators.required),
      "country": new FormControl({ value: this.user.country, disabled: true }),
      "email": new FormControl({ value: this.user.email, disabled: true }),
      "phone": new FormControl(this.user.phone),

    });
    this.editpass = new FormGroup({
      "password": new FormControl(null,[Validators.required ,Validators.minLength(6)]),
      "password2": new FormControl(null, [Validators.required, this.confirmPassword.bind(this)]),
    })

    this.editForm.valueChanges.subscribe( // this is for updating form in real time  via subscription 
      (value: any) => {
      }
    );
    this.editpass.valueChanges.subscribe( // this is for updating form in real time  via subscription 
      (value: any) => {
        this.pass = value.password;
      }
    );

  }


  // profile infos changes 
  onsubmit() {
    this.http.updateUser(this.id, this.editForm.value).subscribe(res => {
      this.router.navigate(["/profile"])
      this.toaster.pop("success", this.user.pseudo + " Profile Page", " Has been Edited .")

    }, err => {
      console.log(err);
      this.toaster.pop("warning", "Edit profile Failer ", err.error.message)
      this.toaster.pop("warning", "Edit profile Failer ", err.message)

    })

  }
  onsubmitpass() {
    this.http.Changepass(this.id , this.editpass.value).subscribe(res=>{
      console.log(res);
      
    },err=>{
      console.log(err.error.message);
      
    })
  }

  // this is a personalised validators for checking the confirmation password 
  confirmPassword(control: FormControl | any): { [s: string]: Boolean } | null {
    if (this.pass !== control.value) {
      return { 'NoMatch': true };
    } return null
  }

}
