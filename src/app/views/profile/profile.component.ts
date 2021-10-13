import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user :any = new  Subject
  
  id: any
  constructor(private http: HttpService ,
  )  {
  }
  ngOnInit(): void {
    this.id = localStorage.getItem('_Id')
    this.http.getOneUser(this.id).subscribe(res => {
      this.user = res 
      this.user= this.user.user
      console.log(this.user.image);
            
    }, err => {
      console.log(err);

    })

  }

}
