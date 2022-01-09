import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
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
  isloading = true
  reviewform: FormGroup
  user: any
  formStatus = false
  status = false
  reviews: any[] = []
  totalscore = 0;
  reviewed = false
  reviewedIndex: any
  reviewedScore: any
  reviwedId: any
  button = false

  constructor(private route: ActivatedRoute,
    private http: HttpService,
    private toaster: ToasterService) { }

  ngOnInit(): void {
    this.isloading = true
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user)

    this.reviewform = new FormGroup({
      'user': new FormControl(null),
      'review': new FormControl(null, Validators.required),
      'book': new FormControl(null),
      'BookScore': new FormControl(null)

    });

    this.reviewform.valueChanges.subscribe( // this is for updating password input to compare it to password 2 on the confirmpassword validator 
      (value: any) => {
        this.status = this.reviewform.status === 'VALID' ? true : false // this is for updating disablied button 
      }
    );



    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        // spinning 
        this.isloading = true
        this.bookId = params['idd'];
        this.http.getOneBook(this.bookId).subscribe(res => {
          this.book = res

        }, err => {
          console.log(err);

        }, () => {
          this.http.getOneUser(this.user._id).subscribe(res => {
            this.user = res
          },err=>{
            console.log(err);
            
          })
            // setting right path to image src
            if(this.book.bookCover != "http://localhost:3000/uploads/books/generic.jpg") {
            this.book.bookCover = "http://localhost:3000/uploads/books/" + this.book.bookCover
          }
          // stop spinning 
          for (let i = 0; i < this.book.reviews.length; i++) {
            this.totalscore = this.totalscore + this.book.reviews[i].BookScore;
            let idrev = this.book.reviews[i]._id
            this.http.getOneReview(idrev).subscribe(res => {
              this.reviews.push(res)

              // check if the user connected already reviewed this book 
              if (this.reviews[i].user.email == this.user.email) {
                this.button = true
                this.reviewed = true;
                this.reviewedIndex = i
                this.reviewedScore = this.reviews[i].BookScore
                this.reviwedId = this.reviews[i]._id
                this.reviewform.setValue({
                  'user': this.user._id,
                  'book': this.bookId,
                  'review': this.reviews[i].review,
                  'BookScore': this.reviews[i].BookScore
                })
              }

            }, err => {
              console.log(err);
            }, () => {
              if (this.reviews[i].user.image != "http://localhost:3000/uploads/users/download.jpeg") {
                this.reviews[i].user.image = "http://localhost:3000/uploads/users/" + this.reviews[i].user.image
              }
            })
          }
          // extract Book reviewSCORE
          this.book.BookScore = this.totalscore / this.book.reviews.length
          // one decimal after the , 
          this.book.BookScore = (Math.round(this.book.BookScore * 10) / 10).toFixed(1);
          if (this.book.BookScore[0] == 'N') {
            this.book.BookScore = 'No Rating Available'

          } else {
            this.book.BookScore = this.book.BookScore + '/ 5'
          }
          setTimeout(() => {
            this.isloading = false;
          }, 1000);
        })

      }
    );
  }

  OnSubmit() {
    if (this.button) {
      this.http.updateReview(this.reviwedId, this.reviewform.value).subscribe(res => {
        this.toaster.pop('success', 'Review Updated', 'Successfully !! ');
        location.reload()
      }, err => {
        console.log(err);
        this.toaster.pop('error', 'Inernal Servor Problem', ' Task has failed ');
        this.toaster.pop('error', 'Inernal Servor Problem', err.error);
      })
    } else {
      this.http.createReview(this.reviewform.value).subscribe(res => {
        this.toaster.pop('success', 'Review submitted', 'Successfully !! ');
        location.reload()
      }, err => {
        console.log(err);
        this.toaster.pop('error', 'Inernal Servor Problem', ' Task has failed ');
        this.toaster.pop('error', 'Inernal Servor Problem', err.error);
      })
    }

  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
  onchange(data: HTMLInputElement) {
    this.reviewform.patchValue({ BookScore: data });
    this.reviewform.patchValue({ book: this.bookId });
    this.reviewform.patchValue({ user: this.user._id });
    this.formStatus = true
  }

  ondeleteRev(Id: any) {
    this.http.deleteReview(Id).subscribe(res => {
      this.toaster.pop('success', 'Operation succeeded', 'Successfully !! ');
      location.reload()
    }, err => {
      console.log(err);
      this.toaster.pop('error', 'Inernal Servor Problem', ' Task has failed ');
      this.toaster.pop('error', 'Inernal Servor Problem', err.error);





    })
  }
}
