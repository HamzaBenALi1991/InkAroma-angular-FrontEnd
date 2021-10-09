import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { countries } from '../../shared/component/store/country-data';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html',

})
export class RegisterComponent implements OnInit {
  constructor(private http: HttpService) { }
  public countries: any = countries
  SignUpForm: FormGroup;
  pass: "";
  status = false;
  imageuploaded: any

  formdata = new FormData();



  ngOnInit() {
    this.SignUpForm = new FormGroup({
      "pseudo": new FormControl(null, Validators.required),
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "password": new FormControl(null, [Validators.required, Validators.minLength(6)]),
      "password2": new FormControl(null, [Validators.required, this.confirmPassword.bind(this)]),
      "firstname": new FormControl(null, Validators.required),
      "lastname": new FormControl(null, Validators.required),
      "age": new FormControl(null),
      "country": new FormControl(null),
      "phone": new FormControl(null),
      "image": new FormControl(null),

    });
    // for ASYNCvalidation password 
    this.SignUpForm.valueChanges.subscribe( // this is for updating password input to compare it to password 2 on the confirmpassword validator 
      (value: any) => {
        this.pass = value.password;
        this.status = this.SignUpForm.status === 'VALID' ? true : false // this is for updating disablied button 
      }
    );

  }
  selectImage(e: any) {
    // caught image file in change 
    if (e.target.files.length > 0) {
      this.imageuploaded = e.target.files[0];
      console.log(this.imageuploaded);


    }

  }
  onsubmit() {
    // create the user
    let user : any 
    this.http.createUser(this.SignUpForm.value).subscribe(res => {
      console.log(res);
      user = res 
      this.formdata.append('file', this.imageuploaded)
      this.http.uploadImage(this.formdata,user.user._id).subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
        console.log(err.message);
      })
    }, err => {
      console.log(err);
    });



  }
  confirmPassword(control: FormControl | any): { [s: string]: Boolean } | null {
    if (this.pass !== control.value) {
      return { 'NoMatch': true };
    } return null
  }

}
