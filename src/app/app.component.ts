import { Component, OnInit } from '@angular/core';
import { Match } from './models/marches';
import { MatchService } from './services/match-service/match.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-championship-series';
  dataUpcoming  = [new Match()];
  dataRecents: any  = [new Match()];
  dataStandings: any  = [{ column: 'Column value' }];

  constructor(private _service: MatchService) {

  }

  win(name) {
    this._service.setWinner(name).subscribe( () => {
      this._service.getAllTeams().pipe( tap( v => this.dataStandings = v) ).subscribe(console.log)
      this._service.getAll().pipe( tap( v => this.dataRecents = [...v]) ).subscribe(console.log)
    })
  }

  ngOnInit() {
    this._service.getAll().pipe( tap( v => this.dataRecents = v) ).subscribe(console.log)
    this._service.getAllTeams().pipe( tap( v => this.dataStandings = v) ).subscribe(console.log)
  }
}
