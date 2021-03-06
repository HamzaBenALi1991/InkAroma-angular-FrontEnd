import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {


  constructor(private http: HttpClient) { }
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////// User Api services //////////////////////
  getAllUsers() {
    return this.http.get('http://localhost:3000/users')
  }
  getOneUser(id: any) {
    return this.http.get(`http://localhost:3000/user/${id}`)
  }
  updateUser(id: any, body: any) {
    return this.http.put(`http://localhost:3000/user/${id}`, body)
  }
  deleteUser(id: any) {
    return this.http.delete(`http://localhost:3000/user/${id}`)
  }

  // login 
  login(body: any) {
    return this.http.post(`http://localhost:3000/login`, body)
  }
  // affect a fav book 
  addFavBook(idBook: any, Iduser: any) {
    return this.http.put(`http://localhost:3000/affect-book/${idBook}`, Iduser)
  }
  // desaffect a fav book 
  removeFavBook(idBook: any, Iduser: any) {
    return this.http.put(`http://localhost:3000/desaffect-book/${idBook}`, Iduser)
  }
  // find account and sendd reset link 
  forget(data: any) {
    return this.http.put(`http://localhost:3000/forgetEmail`, data);
  }
  // change password  after forgetting 
  Resetpassword(data: any) {
    return this.http.put(`http://localhost:3000/resetpassword`, data)
  }
  // changepassord on edit page 

  Changepass(id: any, body: any) {
    return this.http.put(`http://localhost:3000/changepassword/${id}`, body)
  }

  addProfile(name: any, image: any)  {
    name = JSON.stringify(name)
    const profileData = new FormData();
    profileData.append("user", name);
    profileData.append("image", image);

   return this.http.post("http://localhost:3000/newuser", profileData)
      
  }
  // this is for update profile piture alone 
  addImage(file :FormData , id :any ){
    return this.http.put(`http://localhost:3000/upload/${id}`, file)
  }
  // this is for update bookcover
  addImagetobook(file :FormData , id :any ){
    return this.http.put(`http://localhost:3000/upload/book/${id}`, file)
  }


  ///////////////////////////////////////////////////////////////////////////
  ////////////////////////////////// BookService ////////////////////////////
  getAllBooks() {
    return this.http.get('http://localhost:3000/books')
  }
  getOneBook(id: any) {
    return this.http.get(`http://localhost:3000/book/${id}`)
  }
  updateBook(id: any, body: any) {
    return this.http.put(`http://localhost:3000/book/${id}`, body)
  }
  deleteBook(id: any) {
    return this.http.delete(`http://localhost:3000/book/${id}`)
  }
  createBook(name: any, image: any) {
    name = JSON.stringify(name)
    const bookData = new FormData();
    bookData.append("book", name);
    bookData.append("bookCover", image);
    return this.http.post(`http://localhost:3000/newbook`, bookData)
  }

  // affect review to be delete after confirmation 
  affectReview(idBook: any, idReview: any, body: any) {
    return this.http.put(`http://localhost:3000/affect-review/:idbook/:idreview/${idBook}/${idReview}`, body)
  }
  // remove review to be delete after confirmation 
  removeReview(idBook: any, idReview: any, body: any) {
    return this.http.put(`http://localhost:3000/desaffect-review/:idbook/:idreview/${idBook}/${idReview}`, body)
  }
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////review APi serice //////////////////////////////
  getAllReviews() {
    return this.http.get('http://localhost:3000/reviews')
  }
  getOneReview(id: any) {
    return this.http.get(`http://localhost:3000/review/${id}`)
  }
  updateReview(id: any, body: any) {
    return this.http.put(`http://localhost:3000/review/${id}`, body)
  }
  deleteReview(id: any) {
    return this.http.delete(`http://localhost:3000/review/${id}`)
  }
  createReview(body: any) {
    return this.http.post(`http://localhost:3000/newreview`, body)
  }
 



}



