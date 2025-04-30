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
        // Log detailed error information
        this.loggingService.error(
          `HTTP Error: ${error.status} - ${error.message || 'Unknown error'}`
        );

        let userFriendlyMessage = 'An unexpected error occurred.';
        if (error.status === 400) {
          userFriendlyMessage = 'Bad Request. Please check your input.';
        } else if (error.status === 401) {
          userFriendlyMessage = 'Unauthorized. Please log in.';
        } else if (error.status === 500) {
          userFriendlyMessage = 'Server error. Please try again later.';
        }

        return throwError(() => new Error(userFriendlyMessage));
      })
    );
  }
}