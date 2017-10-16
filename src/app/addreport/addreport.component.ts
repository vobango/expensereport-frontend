import {Component, OnInit} from '@angular/core';
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
  currency: string;
  creditCard: boolean;


  constructor(private fb: FormBuilder) {
    this.rForm = fb.group({
      'name': [null, Validators.required],
      // 'description': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(30)])],
      // 'validate': ''
    });
  }

  addPost(post) {
    this.name = post.employee;



  }
}

//   constructor(private http: HttpClient) {
//   }
//
//   ngOnInit(): void {
//     this.http.get<any>('http://localhost:8080/reports/' + this.reportId).subscribe(data => {
//
//       this.report = data;
//       console.log(data);
//     });
//
//   }
// }

interface ItemsResponse {
  results: any[];
}
