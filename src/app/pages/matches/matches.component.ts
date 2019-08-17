import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match-service/match.service';
import { tap, map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Match } from 'src/app/models/marches';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {

  get matchs(): Observable<Match[]> { return this._matchs$; }
  set matchs(v: Observable<Match[]>) {
    this._matchs$ = v;
  }

  private _matchs$: Observable<Match[]>;

  private _mastchsList$ = new BehaviorSubject(null);

  constructor(private _service: MatchService) {
    this.matchs = this._mastchsList$.asObservable();
  }

  ngOnInit() {
    this.fetchMaches();
  }

  onSearch($event) {
    
  }

  onValueChanges($event) {

  }

  private fetchMaches(): void {
    this._service.getAll().subscribe( matches => this._mastchsList$.next(matches));
  }
}
