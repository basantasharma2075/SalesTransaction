import { ActivatedRoute } from '@angular/router';
import { UserDetailService } from './user-detail.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MvUserDetail } from './user-detail.model';
import { MatTableDataSource } from '@angular/material/table';
import { map, mergeMap } from 'rxjs/operators';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  displayedColumns: string[];
  dataSource: MvUserDetail[] = [];
  userMsg: string = null;

//  constructor(private http: HttpClient, private uds: UserDetailService) { }

constructor(private userDetailService: UserDetailService) { }


  ngOnInit(): void {

    this.displayedColumns = ['PersonId', 'FirstName', 'LastName', 'UserName', 'LoginPassword'];
    this.getUserDetail();
  }

 getUserDetail() {

    // tslint:disable-next-line: radix
    const PersonId = parseInt(localStorage.getItem('PersonId'));
    this.userDetailService.getUser(PersonId).subscribe((data: any) => {
      if (data) {
        this.dataSource = [data];
        console.log(Response);
      } else {
        this.dataSource = [];
        console.log('No data');
      }
    });

  }

  getAllUser() {
    this.userDetailService.getAllUserDetail().subscribe((data: any) => {

      if (data) {
        this.dataSource = data.data;
      } else {
        this.dataSource = [];
        this.userMsg = 'No data found !';
      }
    });
  }

}