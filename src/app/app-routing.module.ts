import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { HomeComponent } from './components/home/home.component';
import { WorkOrderListComponent } from './components/work-order-list/work-order-list.component';
import { WorkOrderComponent } from './components/work-order/work-order.component';
import { WorkerComponent } from './components/worker/worker.component';
import { SystemsComponent } from './components/systems/systems.component';
import { authGuard } from './shared/auth.guard';

const routes: Routes = [
  {path: 'sign-up', component:SignupComponent},
  {path: 'sign-in', component:SigninComponent},

  {path: 'home', canActivate:[authGuard], component:HomeComponent,children:[
    {path: 'work-order/:id', component:WorkOrderComponent},
    {path: 'work-order-list', component:WorkOrderListComponent},
    {path: 'worker', component:WorkerComponent},
    {path: 'systems', component:SystemsComponent},

  ]},


  {path: '',   redirectTo:'sign-in', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
