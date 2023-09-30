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

    const lcUrl = req.url.toLowerCase();

    // Skip both non-mutating requests and absolute URLs.
    // Non-mutating requests don't require a token, and absolute URLs require special handling
    // anyway as the cookie set

    // on our origin is not the same as the token expected by another origin.

    /*

    if (req.method === 'GET' || req.method === 'HEAD' || lcUrl.startsWith('http://') ||

        lcUrl.startsWith('https://')) {

      return next.handle(req);

    }

    */    

    if(req.method === 'HEAD'){
        return next.handle(req);
    }

    const token = this.tokenService.getToken();
    console.log('the token:', token);

    if (token !== null && !req.headers.has(this.headerName)) {
      req = req.clone({headers: req.headers
                        .set(this.headerName, token)
                        // .set('X-Requested-With', 'XMLHttpRequest')
                        // .set('X-Login-Ajax-call','true')
                        // .set('Content-Type','application/x-www-form-urlencoded')
      });
    }

    return next.handle(req);
  }
}
