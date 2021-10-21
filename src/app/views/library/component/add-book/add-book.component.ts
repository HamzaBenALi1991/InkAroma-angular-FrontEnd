import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { HttpService } from '../../../../services/http.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  constructor(private http: HttpService,
    private toaster: ToasterService,
    private router: Router) { }
  bookForm: FormGroup
  user: any
  imageData: string
  regexSimple = /^.{50,1000}.*?\b/
  status: any
  isloading =true 

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user)

    this.bookForm = new FormGroup({
      "title": new FormControl(null, [Validators.required]),
      "author": new FormControl(null, Validators.required),
      "bookCover": new FormControl(null),
      "description": new FormControl(null, [Validators.required, Validators.pattern(this.regexSimple)]),
      "user": new FormControl(this.user._id),
      "categorie": new FormControl(null)
    })

    // for ASYNCvalidati 
    this.bookForm.valueChanges.subscribe( // this is for updating password input to compare it to password 2 on the confirmpassword validator 
      (value: any) => {
        this.status = this.bookForm.status === 'VALID' ? true : false // this is for updating disablied button 
      }
    );
    this.isloading=false 
  }


  onchange(event: any) {
    const file = (event.target as HTMLInputElement).files[0];

    this.bookForm.patchValue({ bookCover: file });

    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }

  }

  OnSubmitBook() {
    this.isloading=true 
    this.http.createBook(this.bookForm.value, this.bookForm.value.bookCover).subscribe(res => {
        this.toaster.pop("success" ,'Operaton succeeded ! ',"Book has been Added ." ); 
        this.isloading=false 
        this.router.navigate(["library"])

    }, err => {
      if (err.error == 'This Book  already exist') {
        this.toaster.pop('error', "Operation Failed", "This book Already exist .")
        this.isloading = false 
      } else {
        this.toaster.pop('error', "Operation Failed", "Try and Change the Image Format or the size of the Image." )
        this.toaster.pop('error', "Operation Failed", err.error)
        location.reload()


      }
    })

  }
}

