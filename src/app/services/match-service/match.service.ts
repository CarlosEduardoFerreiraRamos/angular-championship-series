import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Match, Team } from 'src/app/models/marches';

@Injectable()
export class MatchService {

  constructor(private _http: HttpClient) { }

  public getAll(filters?: any): Observable<Match[]> {
    const path = filters ? `${this.basePath}${this.buildQueryParamns(filters)}` : this.basePath;
    return this._http.get<Match[]>(path);
  }

  public getAllTeams(): Observable<Team[]> {
    return this._http.get<Team[]>(`${this.basePath}/teams`);
  }

  public get(id: number): Observable<Match> {
    return this._http.get<Match>(`${this.basePath}/${id}`);
  }

  public setWinner(name: string): Observable<any> {
    return this._http.post(`${this.basePath}/winner`, {name});
  }

  private get basePath(): string {
    return `${environment.api}/match`;
  }

  private buildQueryParamns(paramns): string {
    const keyValue = Object.keys(paramns)
      .filter( key => paramns[key])
      .reduce( ( value, key) => `${value ? `${value},` : value }${key}=${paramns[key]}`, '');
    return keyValue ? `?${keyValue}` : '';
  }
}
