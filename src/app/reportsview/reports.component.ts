import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})

export class ReportsComponent implements OnInit {
  title = 'app';
  reports: any[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/reports').subscribe(data => {

      this.reports = data;
      console.log(data);
    });

  }
}
interface ItemsResponse {
  results: any[];
}
