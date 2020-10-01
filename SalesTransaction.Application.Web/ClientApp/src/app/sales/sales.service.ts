import { Injectable } from '@angular/core';
import { WebApiService } from 'src/services/webapi.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SalesService {
    constructor(private api: WebApiService) { }

    getAllSalesDetail() {
        return this.api.get('sales/allsalesdetail');
    }

    addSales(json): Observable<any>{
        return this.api.post('sales/addsales', json);
      }
      updateSales(json): Observable<any>{
        return this.api.post('sales/updatesales', json);
      }

}

