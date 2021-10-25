import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  isloading = false;

  // reactive form 
  resetPassword: FormGroup
  constructor(private http: HttpService,
    private toester: ToasterService,
    private router: Router,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.resetPassword = new FormGroup({
      password: new FormControl(null,[Validators.minLength(6), Validators.required]),
      resetLink: new FormControl(this.activateRoute.snapshot.params.resetLink)
    });
    this.toester.pop('succes', "Welcome Back", "Set your New Password ")
  }


  OnSubmit() {
    this.isloading = true
    this.http.Resetpassword(this.resetPassword.value).subscribe((response: any) => {
      this.toester.pop('success', 'Success', response.message);
      setTimeout(() => {
        this.router.navigate(['/login']);

      }, 1200);
      this.isloading = false;

    },
      (error) => {
        console.log(error);
        this.toester.pop('error', 'Error', error.error.message);
        this.isloading = false;

      }
    );
  }


}

