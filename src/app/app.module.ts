import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { ToastrModule } from 'ngx-toastr';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
//import { MatFormFieldModule } from '@angular/material/form-field';
//import {MatIconModule} from '@angular/material/icon';
//import {MatSelectModule} from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { WorkOrderListComponent } from './components/work-order-list/work-order-list.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HeaderComponent } from './components/header/header.component';
import { WorkOrderComponent } from './components/work-order/work-order.component';
import { SystemNamePipe } from './shared/system-name.pipe';
import { SubSystemNamePipe } from './shared/sub-system-name.pipe';
import { ShortenDatePipe } from './shared/shorten-date.pipe';
import { SortDirective } from './shared/sort.directive';
import { HideNullPipe } from './shared/hide-null.pipe';
import { WorkToDoPipe } from './shared/work-to-do.pipe';
import { WorkerComponent } from './components/worker/worker.component';
import { SystemsComponent } from './components/systems/systems.component';
import { AuthInterceptor } from './shared/auth.interceptor';
import { HttpResponseInterceptorInterceptor } from './shared/http-response-interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    WorkOrderListComponent,
    SidenavComponent,
    HeaderComponent,
    WorkOrderComponent,
    SystemNamePipe,
    SubSystemNamePipe,
    ShortenDatePipe,
    SortDirective,
    HideNullPipe,
    WorkToDoPipe,
    WorkerComponent,
    SystemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(), // ToastrModule addeds
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    MatSidenavModule,
    MatTabsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    //MatFormFieldModule,
    //MatSelectModule


  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi : true},
    {provide:HTTP_INTERCEPTORS, useClass:HttpResponseInterceptorInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
