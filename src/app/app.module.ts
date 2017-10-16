import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {ExpenseComponent} from './expense/expense.component';
import {GreetingComponent} from './greeting/greeting.component';
import {AlertModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {routes} from './app.router';
import {ReportviewComponent} from './reportview/reportview.component';
import {AddreportComponent} from './addreport/addreport.component';
import {ReportsComponent} from './reportsview/reports.component';
import {HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    ExpenseComponent,
    GreetingComponent,
    ReportviewComponent,
    AddreportComponent,
    ReportsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserModule,
    HttpClientModule,
    AlertModule.forRoot(),
    routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
