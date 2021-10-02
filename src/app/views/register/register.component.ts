import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { countries } from '../../shared/component/store/country-data';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html',

})
export class RegisterComponent implements OnInit {
  constructor() { }
  public countries: any = countries
  SignUpForm: FormGroup

  ngOnInit() {
    this.SignUpForm = new FormGroup({
      "psoeudo": new FormControl(null),
      "email": new FormControl(null),
      "password": new FormControl(null),
      "firstname": new FormControl(null),
      "lastname": new FormControl(null),
      "age": new FormControl(null),
      "country": new FormControl(null),
      "phone": new FormControl(null),
      "image": new FormControl(null),
      

    })
     
  }
 

}
