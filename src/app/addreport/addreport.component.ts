import {Component, OnInit} from '@angular/core';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {NgIf} from '@angular/common';
import {FormsModule, FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {Report, ExpenseDoc} from "../model/models";


@Component({
  selector: 'app-root',
  templateUrl: './addreport.component.html',
  styleUrls: ['./addreport.component.css']
})

export class AddreportComponent implements OnInit{

  public rForm: FormGroup;

  constructor(private _fb: FormBuilder, private _http:HttpClient) { }

  expenseSum: number = 0;
  creditSum: number = 0;
  totalSum: number = 0;
  sum: number = 0;
  rate: number = 1;
  currencies = [
    {name: "EEK", num:0.06},
    {name: "EUR", num:1.00},
    {name: "SEK", num:0.11},
    {name: "USD", num:0.89},
    {name: "LVL", num:1.00},
    {name: "TRY", num:0.31},
    {name: "LTL", num:1.00},
    {name: "CHF", num:0.92},
    {name: "RUB", num:0.01},
    {name: "GBP", num:1.27}
  ];

  ngOnInit() {
    this.rForm = this._fb.group({
      employee: ['', [Validators.required]],
      startDate: [''],
      endDate: [''],
      documents: this._fb.array([
        this.initDocument(),
      ])
    });
  }

  initDocument() {
    return this._fb.group({
      date: [''],
      issuer: ['', [Validators.required]],
      content: ['', [Validators.required]],
      field: ['', [Validators.required]],
      project: ['', [Validators.required]],
      sum: ['', [Validators.required]],
      currency: ['EUR'],
      creditCard: [false],
      sumEur: [0]
    })
  }

  //Add new expense document to report
  addDocument() {
    const control = <FormArray>this.rForm.controls["documents"];
    control.push(this.initDocument());
  }

  //Remove selected document from report
  removeDocument(i: number) {
    const control = <FormArray>this.rForm.controls["documents"];
    control.removeAt(i);
  }

  newSum(event, i) {

    let doc = this.rForm.controls["documents"].value[i];
    doc.sum = event;
    console.log("changed sum", doc);
    this.update(i);
  }

  newCurrency(event, i) {
    this.rate = this.currencies.filter(function(cur) {
      return cur.name === event;
    })[0].num;
    console.log("changed currency", i);
    this.update(i);
  }

  newCredit(event, i) {
    let doc = this.rForm.controls["documents"].value[i];
    doc.creditCard = event;
    console.log("changed credit card", i);
    this.update(i);
  }

  //Update sums when document sum, currency or creditcard values are changed
  update(i) {
    console.log("Starting update on", this);
    let doc = this.rForm.controls["documents"].value[i];
    doc.sumEur = +((doc.sum * this.rate).toFixed(2));
    this.expenseSum = 0;
    this.creditSum = 0;
    this.totalSum = 0;
    for (let document of this.rForm.controls["documents"].value) {
      this.expenseSum += document.sumEur;
      if(document.creditCard) {
        this.creditSum += document.sumEur;
      }
      this.totalSum = +((this.expenseSum - this.creditSum).toFixed(2));
    }
    console.log("Updated", doc);
  }

  onSubmit(data) {
    console.log('Form submitted:', JSON.stringify(data.value));

    /*  //Returns 415 ERROR
    this._http
      .post('http://localhost:8080/reports', JSON.stringify( data.value ))
      .subscribe();*/

    /*   //Returns 403 ERROR
    this._http
      .post('http://localhost:8080/reports', JSON.stringify( data.value ), {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      })
      .subscribe();*/
  }

}

interface ItemsResponse {
  results: any[];
}


