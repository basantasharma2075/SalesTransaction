import { HttpParams } from '@angular/common/http';

import { WebApiService } from 'src/services/webapi.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class UserDetailService {

  constructor(private api: WebApiService) {

  }

  getLogin(json): Observable<any> {
    return this.api.post('/account/login', json);
  }

//   getUser(id: number) {
//     return this.api.get('account/userdetail', JSON.stringify({ PersonId:id}));
// }

// getUser(json: any): Observable<any> {

//   return this.api.get('account/userdetail',  new HttpParams().set('json', JSON.stringify(json)));
// }

getUser(PersonId: number) {
  return this.api.get('account/userdetail', JSON.stringify({ PersonId: PersonId }));
}


getAllUserDetail() {
  return this.api.get('account/alluserdetail');

}

}
