import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BackEndService } from 'src/app/mock-back-end/back-end/back-end.service';
import { Group } from 'src/app/models/marches';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(private _backEnd: BackEndService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return  of(this.manegeRequesitions(request));
  }

  private manegeRequesitions(request: HttpRequest<any>): HttpResponse<any> {
    const {url, method} = request;
    let response: any = {status: 200};
    if (url.includes('winner')) {
      this._backEnd.setMatchWinner(request.body.name);
      response = {...response, body: {}};
    } else if (method === 'GET' && url.includes('teams') && (url.includes('A') || url.includes('B'))) {
      const [group] = url.split('/').reverse();
      response = {...response, body: this._backEnd.getTeamListByGroup(Group[group])};
    } else if (method === 'GET' && url.includes('teams')) {
      response = {...response, body: this._backEnd.getTeamList()};
    } else if (method === 'GET' && url.includes('?') ) {
      const [, queryParamns] = url.split('?');
      response = {...response, body: this._backEnd.getFilteredMatchList(queryParamns)};
    } else if (method === 'GET' ) {
      response = {...response, body: this._backEnd.getMatchList()};
    }
    return new HttpResponse(response);
  }
}
