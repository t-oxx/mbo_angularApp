import { InjectionToken } from '@angular/core';
import { HttpRequest, HttpResponse, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {DOCUMENT, ɵparseCookieValue as parseCookieValue} from '@angular/common';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

export const XSRF_COOKIE_NAME: InjectionToken<string> = new InjectionToken<string>('XSRF-TOKEN');

@Injectable()

/**
 * XsrfTokenService
 */
export class XsrfTokenService implements HttpXsrfTokenExtractor {

  private lastCookieString: any;
  private lastToken: any = null;
  private parseCount: number = 0;
  private MAX_RETRIES: number = 5;

  /**
   * constructor
   * @param doc 
   * @param platform 
   * @param cookieName 
   * @param httpClient 
   * @param baseUrl
   */
  constructor(
      @Inject(DOCUMENT) private doc: any, 
      @Inject(PLATFORM_ID) private platform: string,
      @Inject(XSRF_COOKIE_NAME) private cookieName: string, 
      private httpClient: HttpClient,
      @Inject('BASE_URL') private baseUrl: string)
      {}

  /**
   * tokenRequest
   * @returns XSRFToken
   */
  tokenRequest(): Promise<any> {
    let promise = new Promise((resolve, reject) => { 
        this.httpClient.get(this.baseUrl + 'token', {observe: 'response'}).subscribe(response => {
        });
    });

    return promise;
  }

  /**
   * getToken
   * @returns XSRFToken
   */
  getToken(): string|null {
    // 簡易
    const cookie = document.cookie.split('=');
    if (cookie && cookie.length > 1)
    {
      return  document.cookie.split('=')[1];
    }

    return null;
  }

  /**
   * init
   */
  init(): void {
    this.tokenRequest();
  }
}