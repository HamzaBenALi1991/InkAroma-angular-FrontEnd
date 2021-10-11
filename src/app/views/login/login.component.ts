
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { AuthServiceService } from '../../services/auth-service.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private toasterService: ToasterService, private http: HttpService, private authService: AuthServiceService) { }
  users: any
  token: any
  loginForm: FormGroup
  status = false
  isloading = false
  ngOnInit(): void {
    this.showSuccess();


    this.loginForm = new FormGroup({
      "email": new FormControl(null, [Validators.email, Validators.required]),
      "password": new FormControl(null, Validators.required)

    });
    this.loginForm.valueChanges.subscribe( // this is for updating form in real time  via subscription 
      (value: any) => {
        this.status = this.loginForm.status === 'VALID' ? true : false // this is for updating disablied button 
      }
    );

  }

  showSuccess() {
    this.toasterService.pop('Primary', 'Ink-Aroma', 'Welcomes you back .');
  }

  OnSubmit() {
    this.isloading = true
    this.http.login(this.loginForm.value).subscribe(res => {
      console.log(res);
      this.token = res
      this.token = this.token.token
      this.authService.logIn(this.token)


      this.toasterService.pop("success", "Ink-Aroma", "Login succeded")
      this.isloading = false

    }, err => {
      console.log(err);

      if (err.error.message === 'Please make sure the email and password are correct .') {
        this.isloading = false
        this.toasterService.pop("warning", "login failed", "'Please make sure the email and password are correct .'");

      } else {
        this.isloading = false

        console.log(err.error);

      }

    })

  }


}
