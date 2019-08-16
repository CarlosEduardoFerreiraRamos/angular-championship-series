import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match-service/match.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {

  dataList;

  constructor(private _service: MatchService) { }

  ngOnInit() {
    this._service.getAll().pipe( tap( v => this.dataList = v) ).subscribe()
  }

}
