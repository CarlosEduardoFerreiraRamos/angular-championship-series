import { Component } from '@angular/core';

class Matche {
  id: number;
  teams: string[];
  date: Date;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-championship-series';
  dataUpcoming  = [new Matche()];
  dataRecents  = [new Matche()];
  dataStandings  = [{ column: 'Column value' }];
}
