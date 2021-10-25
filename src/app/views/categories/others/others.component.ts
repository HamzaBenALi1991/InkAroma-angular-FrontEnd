import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.css']
})
export class OthersComponent implements OnInit {

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
          if (this.books[i].categorie==='Others') {
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
