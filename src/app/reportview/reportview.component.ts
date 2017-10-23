import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './reportview.component.html',
  styleUrls: ['./reportview.component.css']
})

export class ReportviewComponent implements OnInit {
  reportId = 1;
  private sub: any;
  reports: any[] = [];
  title = 'app';
  report = {};

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.reportId = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
    this.http.get<any>('http://192.168.115.76/api/reports/' + this.reportId).subscribe(data => {
      this.report = data;
    });

  }

  OnDeleteReport(): void {
    this.sub = this.route.params.subscribe(params => {
      this.reportId = +params['id']; // (+) converts string 'id' to a number
    });
    this.http.delete<any>('http://192.168.115.76/api/reports/' + this.reportId).subscribe(data => {
      this.report = data;
      console.log(data);
    });
   }
}

  interface   ItemsResponse {
  results: any[];
}
