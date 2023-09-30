import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { XsrfTokenService } from '../service/xsrf-token-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  constructor(tokenService : XsrfTokenService) {
    tokenService.init();
  }
}
