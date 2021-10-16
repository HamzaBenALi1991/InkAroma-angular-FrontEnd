import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsertypeModule } from '../shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {

  constructor() { }


  ageCalculated(data: any) {
    if (data) {
      let timeDiff = Math.abs(Date.now() - new Date(data).getTime());
      let agee = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
      if (agee >120) {
        return "Age you ask ? This person is ghost or had not been born yet. "
      } else {
        return agee + ' years old '
      }
    } else {
      return "An Free Spirit without age ."
    }
  };

}
