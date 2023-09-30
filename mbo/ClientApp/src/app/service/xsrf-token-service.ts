import { InjectionToken } from '@angular/core';
import { HttpXsrfTokenExtractor } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {DOCUMENT, ɵparseCookieValue as parseCookieValue} from '@angular/common';

/**
 * XSRF CookieName
 */
export const XSRF_COOKIE_NAME: InjectionToken<string> = new InjectionToken<string>('XSRF-TOKEN');

@Injectable()

/**
 * XsrfTokenService
 */
export class XsrfTokenService implements HttpXsrfTokenExtractor {

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
   * getToken
   * @returns XSRFToken
   */
  getToken(): string|null {
    const token = this.getCookieValueByKey(this.cookieName);
    if (token === '')
    {
      return null;
    }

    return token;
  }

  /**
   * init
   */
  init(): void {
    this.tokenRequest();
  }

  /**
   * tokenRequest
   * @returns XSRFToken
   */
  private tokenRequest(): void {
    this.httpClient.get(this.baseUrl + 'token', {observe: 'response'});
  }

  /**
   * getCookieValueByKey
   * @param key 
   * @returns targetcookieValue
   */
  private getCookieValueByKey(key: string): string {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        var cookiesArray = cookie.split('='); 
        if (cookiesArray[0].trim() == key.trim()) { 
            return cookiesArray[1];
        }
    }
    return '';
  }  
}