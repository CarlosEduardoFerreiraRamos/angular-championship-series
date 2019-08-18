import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match-service/match.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Team, Group } from 'src/app/models/marches';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit {
  get teamsA(): Observable<Team[]> { return this._teamsA$; }
  set teamsA(v: Observable<Team[]>) {
    this._teamsA$ = v;
  }

  get teamsB(): Observable<Team[]> { return this._teamsB$; }
  set teamsB(v: Observable<Team[]>) {
    this._teamsB$ = v;
  }

  private _teamsA$: Observable<Team[]>;
  private _teamsB$: Observable<Team[]>;
  private _teamListA$ = new BehaviorSubject(null);
  private _teamListB$ = new BehaviorSubject(null);

  constructor(private _service: MatchService) {
    this.teamsB = this._teamListB$.asObservable();
    this.teamsA = this._teamListA$.asObservable();
  }

  ngOnInit() {
    this.fetchTeams();
  }

  private fetchTeams(): void {
    this._service.getTeamsByGroup(Group.A).subscribe( teams => this._teamListA$.next(teams));
    this._service.getTeamsByGroup(Group.B).subscribe( teams => this._teamListB$.next(teams));
  }

}
