import { Injectable ,EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  
bookId = new EventEmitter()


  constructor() { }

}
