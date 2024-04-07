import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpResponseInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private authService:AuthService,
    private toastr:ToastrService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // Observa y maneja la respuesta del servidor aquí
          const responseBody = event.body;
          if (responseBody && responseBody.status == 'Token is Invalid') {
            // Si la respuesta del servidor indica que el token es inválido, desloguea al usuario
            this.toastr.error(
              'Token Inválido',
              'ERROR',
              { timeOut: 1500, progressBar: true }
            );
            this.authService.logout(); // Llama al método de logout de tu servicio de autenticación
          }
          else if(responseBody && responseBody.status == 'Token is Expired'){
            this.toastr.error(
              'El Token ha expirado',
              'ERROR',
              { timeOut: 1500, progressBar: true }
            );
            this.authService.logout();
          }
          else if(responseBody && responseBody.status == 'Authorization Token not found'){
            this.toastr.error(
              'Token de autorización no encontrado',
              'ERROR',
              { timeOut: 1500, progressBar: true }
            );
            this.authService.logout();
          }
        }
      })
    );
  }
}
