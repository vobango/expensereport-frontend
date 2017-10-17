import {Component, OnInit} from '@angular/core';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {HttpClient} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {NgIf} from '@angular/common';
import {FormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './addreport.component.html',
  styleUrls: ['./addreport.component.css']
})

export class AddreportComponent {
  rForm: FormGroup;
  post: any;
  issuer: string;
  name: string;
  startDate: string;
  endDate: string;
  content: string;
  field: string;
  project: string;
  sum: string;
  sumEur: string;
  currency: string;
  creditCard: boolean;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.rForm = this.fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(30)])],
      'startDate': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(30)])],
      'endDate': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(30)])],
      'issuer': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(30)])],
      'content': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(30)])],
      'field': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(30)])],
      'project': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(30)])],
      'sum': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(30)])],
      'sumEur': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(30)])],
      'currency': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(30)])],
      'creditCard': [null],
      // 'name': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(30)])],
      // 'validate': ''
    });
  }

  onSubmit(data) {
    console.log('form submitted', data);
    const body = {name: 'Brad'};

    this.http
      .post('http://localhost:8080/reports', data)
      // See below - subscribe() is still necessary when using post().
      .subscribe(response => console.log(response));
    // this.post.empolyee(this.rForm.value.categoryname).subscribe(data => {
    // });
  }

}

interface ItemsResponse {
  results: any[];
}


