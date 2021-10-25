import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-horror',
  templateUrl: './horror.component.html',
  styleUrls: ['./horror.component.css']
})
export class HorrorComponent implements OnInit {

  constructor(private http:HttpService) { }
  books:any [any] = []
  categorie: any[any] = []
  isloading= true 
  ngOnInit(): void {
    this.http.getAllBooks().subscribe(res => {
      this.isloading=true
      this.books = res
      
    }, err => {
      console.log(err);

    }, () => {
      for (let i = 0; i < this.books.length; i++) {
          if (this.books[i].categorie==='Horror') {
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
