import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  books: any
  isloading=true 
 
  
  constructor(private http: HttpService) { }

  ngOnInit(): void {
        
    this.http.getAllBooks().subscribe(res => {
      this.books = res
    }, err => {
      console.log(err);

    })
    setTimeout(() => {
      for (let i = 0; i < this.books.length; i++) {
        
        if (this.books[i].bookCover !="http://localhost:3000/uploads/books/generic.jpg") {          
          this.books[i].bookCover = "http://localhost:3000/uploads/books/" + this.books[i].bookCover          

        }
        
      }
      this.isloading=false
    }, 500);
    
  }
}
