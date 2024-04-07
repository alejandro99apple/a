import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralService } from '../services/general.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token!:any;

  constructor(
    private generalService:GeneralService
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = this.generalService.getUser()
    this.token = localStorage.getItem('token');
    if(!this.token){
      const modifiedRequest = request.clone({
        headers : new HttpHeaders()
          .set('Access-Control-Allow-Headers', '*')
          .set('Access-Control-Allow-Origin', '*')
          .set('Access-Control-Allow-Methods', '*')
      })
    return next.handle(modifiedRequest);
    }
    else{
      const modifiedRequest = request.clone({
        params: new HttpParams().set('token',this.token).set('isAdmin',user.username == 'admin' ? true : false),
        headers : new HttpHeaders()
          .set('Access-Control-Allow-Headers', '*')
          .set('Access-Control-Allow-Origin', '*')
          .set('Access-Control-Allow-Methods', '*')

      })
      return next.handle(modifiedRequest);
    }

  }
}
