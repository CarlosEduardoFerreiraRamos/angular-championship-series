import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BackEndService } from 'src/app/mock-back-end/back-end/back-end.service';
import { Group } from 'src/app/models/marches';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(private _backEnd: BackEndService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes('random')) {
      return next.handle(request);
    } else {
      return  of(this.manegeRequesitions(request));
    }
  }

  private manegeRequesitions(request: HttpRequest<any>): HttpResponse<any> {
    const {url, method} = request;
    let response: any = {status: 200};
    if (url.includes('score')) {
      this._backEnd.setMatchScore(request.body.score);
      response = {...response, body: {}};
    } else if (method === 'GET' && url.includes('teams') && (url.includes('A') || url.includes('B'))) {
      const [group] = url.split('/').reverse();
      response = {...response, body: this._backEnd.getTeamListByGroup(Group[group])};
    } else if (method === 'GET' && url.includes('teams') && url.includes('firsts')) {
        response = {...response, body: this._backEnd.getTeamListFirst()};
    } else if (method === 'GET' && url.includes('teams')) {
      response = {...response, body: this._backEnd.getTeamList()};
    } else if (method === 'GET' && url.includes('next')) {
      response = {...response, body: this._backEnd.getNextMatch()};
    } else if (method === 'GET' && url.includes('previous')) {
      response = {...response, body: this._backEnd.getPreviousMatch()};
    } else if (method === 'GET' && url.includes('?') ) {
      const [, queryParamns] = url.split('?');
      response = {...response, body: this._backEnd.getFilteredMatchList(queryParamns)};
    } else if (method === 'GET' ) {
      response = {...response, body: this._backEnd.getMatchList()};
    }
    return new HttpResponse(response);
  }
}
