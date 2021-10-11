import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  findaccount: FormGroup
  isLoading =false 
  constructor(private http: HttpService , private toester : ToasterService) { }

  ngOnInit(): void {
    this.findaccount = new FormGroup({
      "email": new FormControl(null, [Validators.required , Validators.email])
    })
  }
  OnSubmit() {
    // spinner start  
    this.isLoading= true
    this.http.forget(this.findaccount.value).subscribe(res => {
      // spinner stop 
      // toester 
      this.toester.pop("succes" , "Ink-Aroma" , res.toString())
      console.log(res);
      this.isLoading= false 
      this.findaccount.reset

    }, err => {
      // spinner stop 
      // toester 
      this.toester.pop("succes" , "Ink-Aroma" , err.error.message.toString());
      console.log(err);
      this.isLoading = false 


    })
  }
}
