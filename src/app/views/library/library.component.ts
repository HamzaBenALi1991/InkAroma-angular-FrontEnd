import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { sample } from 'rxjs-compat/operator/sample';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  books: any
  isloading = true
  @Input() book: any
  sampleodtoday: any[] = []
  scfi: any[] = []
  romantic: any[] = []
  fantasy: any[] = []
  horror: any[] = []
  drama: any[] = []
  detective: any[] = []
  others: any[] = []



  constructor(private http: HttpService,
    private router: Router) { }

  ngOnInit(): void {
    this.http.getAllBooks().subscribe(res => {
      this.books = res
    }, err => {
      console.log(err);

    }, () => {
      // 10 random books
      for (let i = 0; i < 15; i++) {
        this.sampleodtoday.push(this.books[Math.floor(Math.random() * this.books.length)]);
        const test = new Set(this.sampleodtoday)
        this.sampleodtoday = Array.from(test)
      }
      if (this.sampleodtoday.includes(undefined)) {
        this.sampleodtoday = []
        console.log("test");

      }

      for (let i = 0; i < this.books.length; i++) {
        if (this.books[i].categorie == 'Romantic') {
          this.romantic.push(this.books[i])
        } else if (this.books[i].categorie == 'Fantasy') {
          this.fantasy.push(this.books[i])
        } else if (this.books[i].categorie == 'Drama') {
          this.drama.push(this.books[i])
        } else if (this.books[i].categorie == 'Horror') {
          this.horror.push(this.books[i])
        } else if (this.books[i].categorie == 'Detective') {
          this.detective.push(this.books[i])
        } else if (this.books[i].categorie == 'Others') {
          this.others.push(this.books[i])
        } else {
          this.scfi.push(this.books[i])
        }



      }
    })
    setTimeout(() => {
      for (let i = 0; i < this.books.length; i++) {

        if (this.books[i].bookCover != "http://localhost:3000/uploads/books/generic.jpg") {
          this.books[i].bookCover = "http://localhost:3000/uploads/books/" + this.books[i].bookCover

        }

      }
      this.isloading = false
    }, 500);

  }


  checkBook(data: any) {
    this.router.navigate(['library/Book/' + data])
  }
}
