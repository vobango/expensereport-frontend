import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

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

  constructor(private _http: HttpClient, private _route: ActivatedRoute, private _router: Router) {
  }

  ngOnInit(): void {
    this.sub = this._route.params.subscribe(params => {
      this.reportId = +params['id']; // (+) converts string 'id' to a number
    });
    this._http.get<any>('http://192.168.115.76/api/reports/' + this.reportId).subscribe(data => {
      this.report = data;
    });

  }

  // Delete report
  OnDeleteReport(): void {
    this.sub = this._route.params.subscribe(params => {
      this.reportId = +params['id']; // (+) converts string 'id' to a number
    });
    this._http.delete<any>('http://192.168.115.76/api/reports/' + this.reportId).subscribe(data => {
      this.report = data;
    });
    this._router.navigate(['/reportsview']);
  }
}
