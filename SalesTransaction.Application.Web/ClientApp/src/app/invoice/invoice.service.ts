import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from 'src/services/webapi.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private api: WebApiService) { }

  getAllInvoiceDetail(){
    return this.api.get('invoice/allinvoicedetail');
  }

  addInvoice(json: any): Observable<any> {
    return this.api.post('invoice/addinvoice', json);
  }


  getInvoiceDescription(id): Observable<any>{
    return this.api.get('invoice/InvoiceDescription', JSON.stringify({invoiceId : id}));
  }

 
}