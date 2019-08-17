import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BackEndService } from 'src/app/mock-back-end/back-end/back-end.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(private _backEnd: BackEndService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return  of(this.manegeRequesitions(request));
  }

  private manegeRequesitions(request: HttpRequest<any>): HttpResponse<any> {
    let response: any = {status: 200};
    if (request.url.includes('winner')) {
      this._backEnd.setMatchWinner(request.body.name)
      response = {...response, body: {}};
    } else if (request.method === 'GET' && request.url.includes('teams')) {
      response = {...response, body: this._backEnd.getTeamList()};
    } else if (request.method === 'GET' && request.url.includes('?') ) {
      const [, queryParamns] = request.url.split('?');
      response = {...response, body: this._backEnd.getFilteredMatchList(queryParamns)};
    } else if (request.method === 'GET' ) {
      response = {...response, body: this._backEnd.getMatchList()};
    }
    return new HttpResponse(response);
  }
}
