import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { countries } from '../../shared/component/store/country-data';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html',

})
export class RegisterComponent implements OnInit {
  constructor() { }
  public countries: any = countries
  SignUpForm: FormGroup ; 
  pass : "";
  status = false;


  ngOnInit() {
    this.SignUpForm = new FormGroup({
      "psoeudo": new FormControl(null , Validators.required),
      "email": new FormControl(null , [Validators.required,Validators.email]),
      "password": new FormControl(null , [Validators.required, Validators.minLength(6)]),
      "password2" : new FormControl(null , [ Validators.required,this.confirmPassword.bind(this)]),
      "firstname": new FormControl(null),
      "lastname": new FormControl(null),
      "age": new FormControl(null),
      "country": new FormControl(null),
      "phone": new FormControl(null),
      "image": new FormControl(null),
      

    });
    // for validation password 
    this.SignUpForm.valueChanges.subscribe( // this is for updating password input to compare it to password 2 on the confirmpassword validator 
      (value: any) => {
        this.pass = value.password;
        this.status = this.SignUpForm.status === 'VALID' ? true : false // this is for updating disablied button 
      }
    );
     
  }
  onsubmit(){
    console.log(this.SignUpForm);
  }
  confirmPassword(control: FormControl | any): { [s: string]: Boolean } | null {
    if (this.pass !== control.value) {
      return { 'NoMatch': true };
    } return null
  }
}
