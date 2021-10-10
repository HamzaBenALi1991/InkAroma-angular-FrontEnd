
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private toasterService: ToasterService, private http: HttpService) { }
  users: any
  loginForm: FormGroup
  status = false
  ngOnInit(): void {
    this.showSuccess();

    this.loginForm = new FormGroup({
      "email": new FormControl(null, [Validators.email, Validators.required]),
      "password": new FormControl(null, Validators.required)

    });
    this.loginForm.valueChanges.subscribe( // this is for updating password input to compare it to password 2 on the confirmpassword validator 
      (value: any) => {

        this.status = this.loginForm.status === 'VALID' ? true : false // this is for updating disablied button 
        console.log(this.status);

      }
    );

  }

  showSuccess() {
    this.toasterService.pop('Primary', 'Ink-Aroma', 'Welcomes you back .');
  }
  onclick() {
  }
  OnSubmit() {
    this.http.login(this.loginForm.value).subscribe(res => {
      console.log(res);
      this.toasterService.pop("success", "Ink-Aroma", "Login succeded")
    }, err => {
      console.log(err);
      if (err.error.message === 'Please make sure the email and password are correct .') {
        this.toasterService.pop("warning", "login failed", "'Please make sure the email and password are correct .'");
        
      } else {
        console.log(err.error);

      }

    })

  }


}
