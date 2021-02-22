import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  FormComponent  } from './form/form.component';
import {  EmployeeListComponent} from './employee-list/employee-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'form-component', component: FormComponent },
  { path: 'employee-list-component', component: EmployeeListComponent },
  { path: '',   redirectTo: '/employee-list-component', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
