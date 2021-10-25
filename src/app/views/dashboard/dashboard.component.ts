import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';


@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']

})
export class DashboardComponent implements OnInit {
  isloading = true
  usersStatus = false;
  booksStatus = false;
  reviewsStatus = false;
  books:any []=[]
  users: any[]=[]
  reviews: any[]=[];

  constructor(private http: HttpService) { }
  ngOnInit(): void {
    this.isloading = true
    // load Books 
    this.http.getAllBooks().subscribe((res: []) => {
      this.books = res


    }, err => {
      console.log(err);

    },()=>{
     for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].bookCover != "http://localhost:3000/uploads/books/generic.jpg") {
        this.books[i].bookCover = "http://localhost:3000/uploads/books/" + this.books[i].bookCover
      }       
     }
    })
    // load users 
    this.http.getAllUsers().subscribe((res: []) => {
      this.users = res
    }, err => {
      console.log(err);

    },()=>{
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].image != "http://localhost:3000/uploads/users/download.jpeg") {
          this.users[i].image = "http://localhost:3000/uploads/users/" + this.users[i].image
        }
        
        
      }
    })
    // load Reviews 
    this.http.getAllReviews().subscribe((res: []) => {
      this.reviews = res
      
    }, err => {
      console.log(err);

    })
    setTimeout(() => {
      this.isloading=false
    }, 1000);
  }



  onDeleteUser(id:any){
    const promt = prompt('Are you Sure ? ')
    if (promt =='yes'||'Yes') {
      this.http.deleteUser(id).subscribe(res=>{
        console.log(res);
        
      },err=>{
        console.log(err);
        
      }) 
    }
      
  }
  onDeleteBook(id:any){
    const promt = prompt('Are you Sure ? ')
    if (promt =='yes'||'Yes') {
      this.http.deleteBook(id).subscribe(res=>{
        console.log(res);
        
      },err=>{
        console.log(err);
        
      }) 
    }
      
  }
  onDeleteReview(id:any){
    const promt = prompt('Are you Sure ? ')
    if (promt =='yes'||'Yes') {
      this.http.deleteReview(id).subscribe(res=>{
        console.log(res);
        
      },err=>{
        console.log(err);
        
      }) 
    }
      
  }
}
