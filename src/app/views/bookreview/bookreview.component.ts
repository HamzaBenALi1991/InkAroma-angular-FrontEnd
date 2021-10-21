import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-bookreview',
  templateUrl: './bookreview.component.html',
  styleUrls: ['./bookreview.component.scss']
})
export class BookreviewComponent implements OnInit, OnDestroy {
  bookId: any
  book: any
  subscription: Subscription
  isloading = false
  reviewform: FormGroup
  user :any 
  formStatus =false 
  status = false 
  constructor(private route: ActivatedRoute, private http: HttpService) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user'); 
    this.user = JSON.parse(this.user)
    
    this.reviewform = new FormGroup({
      'user': new FormControl(null),
      'review': new FormControl(null , Validators.required),
      'book' : new FormControl(null) , 
      'BookScore': new FormControl(null)

    });

    this.reviewform.valueChanges.subscribe( // this is for updating password input to compare it to password 2 on the confirmpassword validator 
      (value: any) => {
        this.status = this.reviewform.status === 'VALID' ? true : false // this is for updating disablied button 
      }
    );



    this.subscription = this.route.params.subscribe(
      (params: Params) => {

        this.isloading = true
        this.bookId = params['idd'];
        this.http.getOneBook(this.bookId).subscribe(res => {
          this.book = res
          
        }, err => {
          console.log(err);

        }, () => {
          if (this.book.bookCover != "http://localhost:3000/uploads/books/generic.jpg") {
            this.book.bookCover = "http://localhost:3000/uploads/books/" + this.book.bookCover
          }
          this.isloading = false;


        })

      }


    );



  }

  OnSubmit() {
    this.http.createReview(this.reviewform.value).subscribe(res=>{
      console.log(res);
      
    },err=>{
      console.log(err);
      
    })

  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
  onchange(data:HTMLInputElement) {
        this.reviewform.patchValue({ BookScore: data });
    this.reviewform.patchValue({ book: this.bookId });
    this.reviewform.patchValue({ user: this.user._id });
    this.formStatus = true 
  }
}
