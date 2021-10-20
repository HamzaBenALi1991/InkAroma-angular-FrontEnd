import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BookServiceService } from '../../services/book-service.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  books: any
  isloading = true
 @Input() book:any


  constructor(private http: HttpService ,
     private bookService :BookServiceService,
     private router :Router) { }

  ngOnInit(): void {

    this.http.getAllBooks().subscribe(res => {
      this.books = res
    }, err => {
      console.log(err);

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
    this.router.navigate(['library/Book/'+data])    
  }
}
