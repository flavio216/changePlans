import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem("token");
    const authReq = req.clone({
      headers: req.headers.set("Authorization", `bearer ${token}`)
    });

    let gotoLogin: boolean = false;

    return next.handle(authReq).pipe(
      tap(
        (res) => {},
        (error: any) => {
          if (error.status === 401) {
            gotoLogin = true;
          }

          if (!error.status) {
            error.message =
              'Hubo un problema al establecer la conexión con el servidor. Por favor verifique su conexión en la pantalla "Acerca de..."';
          }
        },
        () => {}
      ),
    );
  }
}
