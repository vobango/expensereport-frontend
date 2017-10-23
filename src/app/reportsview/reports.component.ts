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
  report = {};

  constructor(private _http: HttpClient) {  }

  ngOnInit(): void {
    this._http.get<any[]>('http://192.168.115.76/api/reports').subscribe(data => {
      this.reports = data;
    });
  }

  // Delete report
  OnDeleteReport(reportId): void {
    this._http.delete<any>('http://192.168.115.76/api/reports/' + reportId).subscribe(data => {
      this.ngOnInit();
    });
  }
}
