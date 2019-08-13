import { Component } from '@angular/core';
import { Match } from './models/marches';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-championship-series';
  dataUpcoming  = [new Match()];
  dataRecents  = [new Match()];
  dataStandings  = [{ column: 'Column value' }];
}
