import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  constructor(private http: HttpService,
    private route: ActivatedRoute) { }
  book: any
  subscription: Subscription
  isloading = true
  bookId: any
  status = false
  editBookForm: FormGroup
  regexSimple = /^.{50,1000}.*?\b/
  imageData : string
  image :FormData


  ngOnInit(): void {
    this.editBookForm = new FormGroup({
      "title": new FormControl(null, Validators.required),
      "author": new FormControl(null, Validators.required),
      "description": new FormControl(null, [Validators.required, Validators.pattern(this.regexSimple)]),
      "categorie": new FormControl(null)
    })
    this.editBookForm.valueChanges.subscribe( // this is for updating password input to compare it to password 2 on the confirmpassword validator 
      (value: any) => {
        this.status = this.editBookForm.status === 'VALID' ? true : false // this is for updating disablied button 
      }
    );

    this.subscription = this.route.params.subscribe(
      (params: Params) => {

        this.isloading = true
        this.bookId = params['id'];
        this.http.getOneBook(this.bookId).subscribe(res => {
          this.book = res

        }, err => {
          console.log(err);

        }, () => {
          if (this.book.bookCover != "http://localhost:3000/uploads/books/generic.jpg") {
            this.book.bookCover = "http://localhost:3000/uploads/books/" + this.book.bookCover
          }
          this.editBookForm.setValue({
            'title': this.book.title,
            'author': this.book.author,
            'description': this.book.description,
            'categorie': this.book.categorie
          })
          this.isloading = false;


        })

      },err=>{
        console.log(err);
        
      }


    );
  }

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.image = new FormData(); 
    this.image.append("file" , file )
    console.log(this.image);
    console.log(file);
    
    
    
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);

    }
  }
  onsaveImage(){
    this.isloading=true 
    this.http.addImagetobook(this.image ,this.bookId).subscribe(res=>{
      console.log(res);
      this.isloading= false
      
    },err=>{
      console.log(err);
      
    })
  }

  OnUpdateBook(){
  this.http.updateBook(this.bookId, this.editBookForm.value).subscribe(res=>{
    console.log(res);
    
  },err=>{
    console.log(err);
    
  })
  }
}
