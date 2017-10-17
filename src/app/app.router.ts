import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {AddreportComponent} from './addreport/addreport.component';
import {ReportsComponent} from './reportsview/reports.component';
import {ReportviewComponent} from './reportview/reportview.component';

export const router: Routes = [
  {path: '', redirectTo: 'addreport', pathMatch: 'full'},
  {path: 'menu', component: AppComponent},
  {path: 'reportsview', component: ReportsComponent},
  {path: 'addreport', component: AddreportComponent},
  {path: 'reportview', component: ReportviewComponent},
  {path: 'deletereport', component: ReportviewComponent},
  {path: 'reportview/:id', component: ReportviewComponent}
];
  export const routes: ModuleWithProviders = RouterModule.forRoot(router);

