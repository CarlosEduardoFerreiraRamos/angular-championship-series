import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Match, Team } from 'src/app/models/marches';

@Injectable()
export class MatchService {

  constructor(private _http: HttpClient) { }

  public getAll(): Observable<Match[]> {
    return  this._http.get<Match[]>(this.basePath);
  }

  public getAllTeams(): Observable<Team[]> {
    return  this._http.get<Team[]>(`${this.basePath}/teams`);
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
}
