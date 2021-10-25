import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-detective',
  templateUrl: './detective.component.html',
  styleUrls: ['./detective.component.css']
})
export class DetectiveComponent implements OnInit {
  books:any [any] = []
  categorie: any[any] = []
  isloading= true 
  constructor(private http:HttpService) { }

  ngOnInit(): void {
    this.http.getAllBooks().subscribe(res => {
      this.isloading=true
      this.books = res
      
    }, err => {
      console.log(err);

    }, () => {
      for (let i = 0; i < this.books.length; i++) {
          if (this.books[i].categorie==='Detective') {
            this.categorie.push(this.books[i])
          }        
      }
      console.log(this.categorie);
      setTimeout(() => {
        for (let i = 0; i < this.categorie.length; i++) {
          if (this.categorie[i].bookCover != "http://localhost:3000/uploads/books/generic.jpg") {
            this.categorie[i].bookCover = "http://localhost:3000/uploads/books/" + this.categorie[i].bookCover
          }
  
        }
        this.isloading = false
      }, 700);
      
    })
  }

}
