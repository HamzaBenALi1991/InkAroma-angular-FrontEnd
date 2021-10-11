import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { HttpService } from '../../services/http.service';
import { countries } from '../../shared/component/store/country-data';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html',

})
export class RegisterComponent implements OnInit {
  constructor(private http: HttpService,
    private toasterService: ToasterService,
    private element: ElementRef,
    private path: Renderer2,
    private router: Router) { }
  public countries: any = countries
  SignUpForm: FormGroup;
  pass: "";
  status = false;
  imageuploaded: any
  isloading = false
  formdata = new FormData();



  ngOnInit() {
    // reactive form set up 
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
  // Onchange handler 
  selectImage(e: any) {
    // caught image file in change 
    if (e.target.files.length > 0) {
      this.imageuploaded = e.target.files[0];
      console.log(this.imageuploaded);
    }
  };

  // form sabmit
  onsubmit() {
    //spiner 
    this.isloading = true
    // create the user
    let user: any
    this.http.createUser(this.SignUpForm.value).subscribe(res => {
      console.log(res);
      user = res
      this.SignUpForm.reset()
      // for notification at top 
      this.toasterService.pop("succes", "Registration succeeded", "See you at Login !");
      //redirect to login page 
      setTimeout(() => {
        this.router.navigate(['login'])
      }, 3000);
      // in case file image upload summon a new http request to handle it 
      if (this.imageuploaded) {
        this.formdata.append('file', this.imageuploaded)
        this.http.uploadImage(this.formdata, user.user._id).subscribe(res => {

        }, err => {
          this.toasterService.pop("error", "Registration Failer ", err.error.message);

        })
      }

    }, err => {
      if (err.error === "Email alreadt exist") {
        this.toasterService.pop('error', 'Registeration  Failed  ', 'Email alreadt exist');
        let part = this.element.nativeElement.querySelector('.thisiswrong')
        this.path.addClass(part, 'show')
      } else {
        this.router.navigate(['500'])
      }

    });



  };
  // this is a personalised validators for checking the confirmation password 
  confirmPassword(control: FormControl | any): { [s: string]: Boolean } | null {
    if (this.pass !== control.value) {
      return { 'NoMatch': true };
    } return null
  }

}
