import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { HttpService } from '../../services/http.service';
import { ProfileServiceService } from '../../services/profile-service.service';
import { countries } from '../../shared/component/store/country-data';
import { Countries } from '../../shared/country.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  isloading = true
  user: any
  id: any
  editForm: FormGroup
  editpass: FormGroup
  toggle = false
  pass = '';
  age: any
  public countries: Countries[] = countries
  image :FormData
  imageData : string



  constructor(private http: HttpService,
    private router: Router,
    private toaster: ToasterService,
    private profileService: ProfileServiceService) { }

  ngOnInit(): void {
    // collecting  id of user connected 
    this.id = localStorage.getItem('_Id')
    // get the user connected 
    this.http.getOneUser(this.id).subscribe(res => {
      this.user = res
      localStorage.setItem('user', JSON.stringify(this.user))
      localStorage.setItem('image', this.user.image)

    }, err => {
      console.log(err);
    })
    // import user infos 
    this.user = localStorage.getItem("user");
    this.user = JSON.parse(this.user);
    setTimeout(() => {
      if (this.user.image != "http://localhost:3000/uploads/users/download.jpeg") {
        this.user.image = "http://localhost:3000/uploads/users/" + this.user.image
      }
      this.age = this.profileService.ageCalculated(this.user.age)
      this.isloading = false
    }, 1500);


    // setting up the form 
    this.editForm = new FormGroup({
      "firstname": new FormControl(this.user.firstname, Validators.required),
      "lastname": new FormControl(this.user.lastname, Validators.required),
      "age": new FormControl(this.user.age),
      "pseudo": new FormControl(this.user.pseudo, Validators.required),
      "country": new FormControl(null, Validators.required),
      "email": new FormControl({ value: this.user.email, disabled: true }),
      "phone": new FormControl(this.user.phone),

    });
    this.editpass = new FormGroup({
      "password": new FormControl(null, [Validators.required, Validators.minLength(6)]),
      "password2": new FormControl(null, [Validators.required, this.confirmPassword.bind(this)]),
    })

    this.editForm.valueChanges.subscribe( // this is for updating form in real time  via subscription 
      (value: any) => {
      }
    );
    this.editpass.valueChanges.subscribe( // this is for updating form in real time  via subscription 
      (value: any) => {
        this.pass = value.password;
      }
    );

  }


  // profile infos changes 
  onsubmit() {
    this.http.updateUser(this.id, this.editForm.value).subscribe(res => {
      this.router.navigate(["/profile"])
      this.toaster.pop("success", this.user.pseudo + " Profile Page", " Has been Edited .")

    }, err => {
      console.log(err);
      this.toaster.pop("warning", "Edit profile Failer ", err.error.message)
      this.toaster.pop("warning", "Edit profile Failer ", err.message)

    })

  }
  onsubmitpass() {
    this.http.Changepass(this.id, this.editpass.value).subscribe(res => {
      console.log(res);
      this.toaster.pop("success", "WELL DONE !!!", "Password has been updated successfully ");
      this.toggle = !this.toggle
    }, err => {
      console.log(err.error.message);
      this.toaster.pop("warning", "Servor Problem  !!!", err.error.message);
      this.toaster.pop("error", "Servor Problem  !!!", 'Failed to update ');



    })
  }

  // this is a personalised validators for checking the confirmation password 
  confirmPassword(control: FormControl | any): { [s: string]: Boolean } | null {
    if (this.pass !== control.value) {
      return { 'NoMatch': true };
    } return null
  }


  // on change image 
  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.image = new FormData(); 
    this.image.append("file" , file )
    
    
    
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);

    }
  }
  // on change user image 
  onsaveImage(){
    this.isloading=true 
    this.http.addImage(this.image ,this.id).subscribe(res=>{
      this.toaster.pop('success' , this.user.pseudo +' Profile Image ','Has been updated .')
      this.router.navigate(['/profile'])
      
    },err=>{
      console.log(err);
      this.toaster.pop('warning' , this.user.pseudo +' Profile Image ','failed to updated .') 
      this.toaster.pop('warning' ,  'failed to updated ' ,'Inernal Servor Problem') 

    })
  }
  // delete account 
  onDelete(){
    let person = prompt("Are you Sure you want to delete your account ?", "If Yes ,Write your Email ");
    if (person == this.user.email) {      
      this.http.deleteUser(this.user._id).subscribe(res=>{
        this.toaster.pop('warning' , "GoodBye"+ this.user.pseudo , "your account has been Deleted .");
        this.router.navigate(['/login']) ; 
        localStorage.clear()
        
      },err=>{
      this.toaster.pop("error" , "Sorry!!!" ," AN internal Error has occured .")
        
      })      
    }

  }

}
