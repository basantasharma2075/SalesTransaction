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

  getUser(LoginId: number) {
  return this.api.get('account/userdetail', JSON.stringify({ LoginId: LoginId }));
}


getAllUserDetail() {
  return this.api.get('account/alluserdetail');

}

}
