
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { AuthServiceService } from '../../services/auth-service.service';
import { HttpService } from '../../services/http.service';
import { quotes } from '../../shared/component/store/quotes-data';
import { Quotes } from '../../shared/quotes.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private toasterService: ToasterService,
    private http: HttpService,
    private authService: AuthServiceService,
    private router: Router) { }
  Id : any 
  users: any
  token: any
  loginForm: FormGroup
  status = false
  isloading = false
  quoetes: Quotes[] = quotes
  quote: any = " There was the smell of old books, a smell that has a way of making all libraries seem the same. Some say that smell is asbestos."
  ngOnInit(): void {
    this.showNotifications();
    // quotes generator 
    setInterval(() => {
      this.quote = this.quoetes[(Math.random() * this.quoetes.length) | 0]
      this.quote = this.quote.quotes

    }, 5000);


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
  // toester 
  showNotifications() {
    this.toasterService.pop('Primary', 'Ink-Aroma', 'Welcomes you back .');
  }

  OnSubmit() {
    // spiner loaded 
    this.isloading = true
    // http request infos
    this.http.login(this.loginForm.value).subscribe(res => {
      this.token = res
      this.Id=res
      this.Id=this.Id._Id
      this.token = this.token.token
      this.authService.logIn(this.token , this.Id) ,
      //notifications 
      this.toasterService.pop("success", "Ink-Aroma", "Login succeded")
      this.isloading = false
      this.router.navigate(["dashboard"])
    }, err => {
      if (err.error.message === 'Please make sure the email and password are correct .') {
        this.isloading = false
        this.toasterService.pop("warning", "login failed", "'Please make sure the email and password are correct .'");

      } else {
        // spinner stopped 
        this.isloading = false
        this.toasterService.pop("warning", "login failed", "Internal Serveur Problem .");
        console.log(err.error);

      }

    })

  }


}
