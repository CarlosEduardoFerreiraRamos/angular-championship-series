import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Match } from 'src/app/models/marches';

@Injectable()
export class MatchService {

  constructor(private _http: HttpClient) { }

  public getAll(): Observable<Match[]> {
    return  this._http.get<Match[]>(this.basePath);
  }

  public get(id: number): Observable<Match> {
    return  this._http.get<Match>(`this.basePath/${id}`);
  }

  private get basePath(): string {
    return `${environment.api}/match`;
  }
}
