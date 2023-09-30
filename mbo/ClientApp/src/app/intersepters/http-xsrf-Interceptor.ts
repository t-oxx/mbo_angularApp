import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandler } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { HttpXsrfTokenExtractor } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

/**
 * RequestHeaderName
 */
export const XSRF_HEADER_NAME: InjectionToken<string> = new InjectionToken<string>('X-CSRF-TOKEN');

/**
 * HttpXsrfInterceptor
 */
@Injectable()
export class HttpXsrfInterceptor implements HttpInterceptor {

  /**
   * constructor
   * @param tokenService 
   * @param headerName 
   */
  constructor(
      private tokenService: HttpXsrfTokenExtractor,
      @Inject(XSRF_HEADER_NAME) private headerName: string) {}
  
  /**
   * intercept
   * @param req 
   * @param next 
   * @returns Observable<HttpEvent<any>>
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.tokenService.getToken();
    if (token !== null && !req.headers.has(this.headerName)) {
      req = req.clone({headers: req.headers.set(this.headerName, token) });
    }

    return next.handle(req);
  }
}
