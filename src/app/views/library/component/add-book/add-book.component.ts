import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../../../../services/http.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  constructor( private http :HttpService) { }
  bookForm: FormGroup
  user :any 
  imageData: string

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.user =JSON.parse(this.user)
    
    this.bookForm = new FormGroup({
      "title": new FormControl(null),
      "author": new FormControl(null),
      "bookCover": new FormControl(null),
      "description": new FormControl(null),
      "user": new FormControl(this.user._id),
      "categorie" : new FormControl(null)
    })
  }


  onchange(event:any){
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

  OnSubmitBook(){
    this.http.createBook(this.bookForm.value , this.bookForm.value.bookCover).subscribe(res=>{
      console.log(res);
      
    },err =>{
      console.log(err);
      
    })
    
  }  
}

