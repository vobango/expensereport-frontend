import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './reportview.component.html',
  styleUrls: ['./reportview.component.css']
})

export class ReportviewComponent implements OnInit {
  reportId = 1;
  title = 'app';
  report = {};

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:8080/reports/' + this.reportId).subscribe(data => {

      this.report = data;
      console.log(data);
    });

  }
}

interface ItemsResponse {
  results: any[];
}
