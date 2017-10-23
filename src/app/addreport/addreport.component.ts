import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './addreport.component.html',
  styleUrls: ['./addreport.component.css']
})

export class AddreportComponent implements OnInit {

  public rForm: FormGroup;

  constructor(private _fb: FormBuilder, private _http: HttpClient) { }

  currencies = [
    {name: 'EEK', num: 0.06},
    {name: 'EUR', num: 1.00},
    {name: 'SEK', num: 0.11},
    {name: 'USD', num: 0.89},
    {name: 'LVL', num: 1.00},
    {name: 'TRY', num: 0.31},
    {name: 'LTL', num: 1.00},
    {name: 'CHF', num: 0.92},
    {name: 'RUB', num: 0.01},
    {name: 'GBP', num: 1.27}
  ];

  ngOnInit() {
    this.rForm = this._fb.group({
      employee: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      expenseSum: [0],
      creditSum: [0],
      totalSum: [0],
      documents: this._fb.array([
        this.initDocument(),
      ])
    });
  }

  initDocument() {
    return this._fb.group({
      date: ['', [Validators.required]],
      issuer: ['', [Validators.required]],
      content: ['', [Validators.required]],
      field: ['', [Validators.required]],
      project: ['', [Validators.required]],
      sum: [0, [Validators.required]],
      currency: ['EUR'],
      creditCard: [false],
      sumEur: [0],
      rate: [1]
    });
  }

  // Add new expense document to report
  addDocument() {
    const control = <FormArray>this.rForm.controls['documents'];
    control.push(this.initDocument());
  }

  // Remove selected document from report
  removeDocument(i: number) {
    const control = <FormArray>this.rForm.controls['documents'];
    control.removeAt(i);
    this.update(i);
  }

  // Update document sum
  newSum(event, i) {
    const doc = this.rForm.controls['documents'].value[i];
    doc.sum = event;
    doc.sumEur = +((doc.sum * doc.rate).toFixed(2));
    this.update(i);
  }

  // Update document currency
  newCurrency(event, i) {
    const doc = this.rForm.controls['documents'].value[i];
    doc.currency = this.currencies.filter(function(cur) {
      return cur.name === event;
    })[0].name;
    this.update(i)
  }

  // Update document credit card use
  newCredit(event, i) {
    const doc = this.rForm.controls['documents'].value[i];
    doc.creditCard = event;
    this.update(i);
  }

  // Update report sums when document sum, currency or creditcard values are changed
  update(i) {
    const form = this.rForm.controls;
    const expense = form['expenseSum'];
    expense.setValue(0);
    const credit = form['creditSum'];
      credit.setValue(0);
    const total = form['totalSum'];
      total.setValue(0);
    for (const document of form['documents'].value) {
      document.rate = this.currencies.filter(function(cur) {
        return cur.name === document.currency;
      })[0].num;
      document.sumEur = +((document.sum * document.rate).toFixed(2));
      expense.setValue(+((expense.value + document.sumEur).toFixed(2)));
      if (document.creditCard) {
        credit.setValue(+((credit.value + document.sumEur).toFixed(2)));
      }
      total.setValue( +((expense.value - credit.value).toFixed(2)));
    }
  }

  onSubmit(data) {
    let body = data.value;
    console.log('Form submitted:', body);

    this._http
      .post('http://192.168.115.76/api/reports', body)
      .subscribe(r => {
        console.log('Add report OK');
      });

  }

}
