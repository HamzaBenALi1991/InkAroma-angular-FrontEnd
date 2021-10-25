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
  imageData: string
  regexPhone = /^[0-9]{5,10}$/
  regexEmail = /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/
  regexname = /^[a-zA-Z][a-z]*(([,.] |[ '-])[A-Za-z][a-z]*)*(\.?)$/
  regexPseudo=/^(?!\s)[a-zA-Z0-9_\s-]{2,20}$/




  ngOnInit() {

    // reactive form set up 
    this.SignUpForm = new FormGroup({
      "pseudo": new FormControl(null,[ Validators.required,Validators.pattern(this.regexPseudo)]),
      "email": new FormControl(null, [Validators.required, Validators.pattern(this.regexEmail)]),
      "password": new FormControl(null, [Validators.required, Validators.minLength(6)]),
      "password2": new FormControl(null, [Validators.required, this.confirmPassword.bind(this)]),
      "firstname": new FormControl(null, [Validators.required, Validators.pattern(this.regexname)]),
      "lastname": new FormControl(null, [Validators.required, Validators.pattern(this.regexname)]),
      "age": new FormControl(null),
      "country": new FormControl(null),
      "phone": new FormControl(null, Validators.pattern(this.regexPhone)),
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
  // on change file 
  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];

    this.SignUpForm.patchValue({ image: file });

    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);

    }
  }
  // this is a personalised validators for checking the confirmation password 
  confirmPassword(control: FormControl | any): { [s: string]: Boolean } | null {
    if (this.pass !== control.value) {
      return { 'NoMatch': true };
    } return null
  }

  // on form submit 
  onsubmit() {
    this.http.addProfile(this.SignUpForm.value, this.SignUpForm.value.image).subscribe(res => {
      //spiner 
      this.isloading = true
      this.SignUpForm.reset();
      this.toasterService.pop("succes", "Registration succeeded", "See you at Login !");
      //redirect to login page 
      setTimeout(() => {
        this.isloading = false
        this.router.navigate(['login'])
      }, 3000);

    }, err => {
      if (err.error === "Email alreadt exist") {
        this.toasterService.pop('error', 'Registeration  Failed  ', 'Email alreadt exist');
        let part = this.element.nativeElement.querySelector('.thisiswrong')
        this.path.addClass(part, 'show');

      } else {
        this.isloading = false
        this.router.navigate(['500'])
      }


    })


  }

}
