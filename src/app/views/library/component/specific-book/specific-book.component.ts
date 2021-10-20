import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { BookServiceService } from '../../../../services/book-service.service';
import { HttpService } from '../../../../services/http.service';

@Component({
  selector: 'app-specific-book',
  templateUrl: './specific-book.component.html',
  styleUrls: ['./specific-book.component.scss']
})
export class SpecificBookComponent implements OnInit, OnDestroy {
  bookId: any
  book: any
  isloading = true
  error = new Error()
  subscription: Subscription


  constructor(
    private http: HttpService, private route: ActivatedRoute) { }
  ngOnInit(): void {

   this.subscription =  this.route.params.subscribe(
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
          this.isloading = false

        })

      }


    );
    setTimeout(() => {

    }, 3000)

  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }


}
