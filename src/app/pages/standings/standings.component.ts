import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match-service/match.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Team } from 'src/app/models/marches';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit {
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
    this.fetchTeams();
  }

  private fetchTeams(): void {
    this._service.getAllTeams().subscribe( teams => this._teamList$.next(teams));
  }

}
