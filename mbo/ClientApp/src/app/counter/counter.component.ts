import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { XsrfTokenService } from '../service/xsrf-token-service';

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent {

  private httpClient: HttpClient;
  private xsrfTokenService: XsrfTokenService;
  private url: string;

  constructor(http: HttpClient, tokenService : XsrfTokenService, @Inject('BASE_URL') baseUrl: string) {
    this.httpClient = http;
    this.xsrfTokenService = tokenService;
    this.url = baseUrl;
  }

  public currentCount = 0;

  public incrementCounter() {
    this.xsrfTokenService.init();
  }
}

