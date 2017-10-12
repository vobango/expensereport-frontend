import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './addreport.component.html',
  styleUrls: ['./addreport.component.css']
})

export class AppComponent implements OnInit {
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
