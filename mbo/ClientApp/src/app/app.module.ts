import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS, HttpXsrfTokenExtractor } from '@angular/common/http';
import { RouterModule } from '@angular/router';

/* compoernents */
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

/* services */
import { XsrfTokenService, XSRF_COOKIE_NAME } from './service/xsrf-token-service';

/* intercepters */
import { HttpXsrfInterceptor, XSRF_HEADER_NAME } from './intersepters/http-xsrf-Interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-CSRF-TOKEN',
    }),
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ]),
  ],
  providers: [
    XsrfTokenService,
    HttpXsrfInterceptor,
    { provide: HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptor, multi: true },
    { provide: HttpXsrfTokenExtractor, useClass: XsrfTokenService },
    { provide: XSRF_COOKIE_NAME, useValue: 'XSRF-TOKEN' },
    { provide: XSRF_HEADER_NAME, useValue: 'X-CSRF-TOKEN' } 

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

