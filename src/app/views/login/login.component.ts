
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private toasterService: ToasterService, private http: HttpService) { }
  users: any
  ngOnInit(): void {
    this.showSuccess();

    this.http.getAllUsers().subscribe(res => {
      this.users = res
    }, err => {
      console.log(err);

    })
  }

  showSuccess() {
    this.toasterService.pop('Primary', 'Ink-Aroma', 'Welcomes you back .');
  }
  onclick() {
    alert(JSON.stringify(this.users))
  }


}
