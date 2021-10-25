import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-prfile-for-others',
  templateUrl: './prfile-for-others.component.html',
  styleUrls: ['./prfile-for-others.component.css']
})
export class PrfileForOthersComponent implements OnInit, OnDestroy {
  isloading = true;
  user: any
  userId: any
  age: any
  books: object[] = []
  subcription: Subscription
  constructor(private route: ActivatedRoute, private http: HttpService) { }

  ngOnInit(): void {
    this.isloading = true;
    this.subcription = this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];

      this.http.getOneUser(this.userId).subscribe(res => {
        this.user = res
      }, err => {
        console.log(err);
      }, () => {
        if (this.user.image != "http://localhost:3000/uploads/users/download.jpeg") {
          this.user.image = "http://localhost:3000/uploads/users/" + this.user.image
        }
        for (let i = 0; i < this.user.addedbooks.length; i++) {
          this.books.push(this.user.addedbooks[i])
        }
        this.isloading = false
      })

    }, err => {
      console.log(err);
    })

  }
  ngOnDestroy() {
    this.subcription.unsubscribe()
  }
}
