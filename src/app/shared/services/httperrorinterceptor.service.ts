import { inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpErrorResponse,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggingService } from './logging.service';

@Injectable()
export class HttperrorinterceptorService implements HttpInterceptor {
  private loggingService = inject(LoggingService);
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorCode = 0;
        switch (error.status) {
          case 400:
            errorCode = 400;
            break;
          case 401:
            errorCode = 400;
            break;
          case 500:
            errorCode = 500;
            break;
          default:
            errorCode = 0;
        }
        this.loggingService.error('Http error occurred!!' + errorCode);
        return throwError(
          () => new Error('Http error occurred with error code ' + errorCode)
        );
      })
    );
  }
}
