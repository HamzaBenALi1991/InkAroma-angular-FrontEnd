import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  findaccount: FormGroup
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.findaccount = new FormGroup({
      "email": new FormControl(null, Validators.required)
    })
  }
  OnSubmit() {
    this.http.forget(this.findaccount.value).subscribe(res => {
      console.log(res);

    }, err => {
      console.log(err);

    })
  }
}
