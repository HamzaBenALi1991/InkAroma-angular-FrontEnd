import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  resetPassword: FormGroup
  constructor(private http: HttpService,
    private toester: ToasterService,
    private router: Router,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.resetPassword = new FormGroup({
      password: new FormControl(null),
      resetLink: new FormControl(this.activateRoute.snapshot.params.resetLink)
    })
  }


  OnSubmit() {
    console.log(this.resetPassword);
    this.http.Resetpassword(this.resetPassword.value).subscribe((response: any) => {
      this.toester.pop('success', 'Success', response.message);
      this.router.navigate(['/login']);
    },
      (error) => {
        console.log(error);
        this.toester.pop('error', 'Error', error.error.message);
      }
    );
  }


}

