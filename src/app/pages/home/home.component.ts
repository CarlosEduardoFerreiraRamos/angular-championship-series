import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match-service/match.service';
import { Match, Team } from 'src/app/models/marches';
import { finalize } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  hasLoadedPrevious: boolean;
  previous: Match;
  next: Match;

  displayedColumns = ['id',	'name', 'group', 'type', 'points'];

  get teams(): Observable<Team[]> { return this._teams$; }
  set teams(v: Observable<Team[]>) {
    this._teams$ = v;
  }

  private _teams$: Observable<Team[]>;
  private _teamList$ = new BehaviorSubject(null);

  constructor(private _service: MatchService) {
    this.teams = this._teamList$.asObservable();
  }

  ngOnInit() {
    this.fetchMatchs();
  }

  private fetchMatchs(): void {
    this._service.getNextMatch().subscribe( next => this.next = next);
    this._service.getPreviousMatch().pipe(finalize(() => this.hasLoadedPrevious = true)).subscribe( prev => {
      this.previous = prev;
    });

    this._service.getTeamListFirst().subscribe( teams => this._teamList$.next(teams));
  }

}
