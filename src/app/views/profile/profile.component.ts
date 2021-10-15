import { Component, OnInit } from '@angular/core';

import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  image: any
  id: any
  isloading = true 
  user :any 
  // public url: SafeResourceUrl;

  constructor(private http: HttpService) {
    //  this.getImage('URL').subscribe(x => this.url = x)
  }

  //  public getImage(url: string): Observable<SafeResourceUrl> {
  //    return this.http2
  //      .get(url, { responseType: 'blob' })
  //      .pipe(
  //        map(x => {
  //          const urlToBlob = window.URL.createObjectURL(x) // get a URL for the blob
  //          return this.sanitizer.bypassSecurityTrustResourceUrl(urlToBlob); // tell Anuglar to trust this value
  //        }),
  //      );
  //  }
  ngOnInit(): void {
    
    this.id = localStorage.getItem('_Id')
    this.http.getOneUser(this.id).subscribe(res => {

      this.user = res
      localStorage.setItem('user', JSON.stringify(this.user))
      localStorage.setItem('image', this.user.image)

    }, err => {
      console.log(err);
    })
    // import user infos 
    this.user = localStorage.getItem("user");
    this.user = JSON.parse(this.user)
    setInterval(() => {
      this.isloading= false 
    }, 500);


    // 
    // this.image= localStorage.getItem('image')
    // console.log(this.image);

    // this.http.getImage({image : this.image}).subscribe(res=>{
    //   alert(res)
    // },err =>{
    //   console.log(err);

    // })

  }

}
