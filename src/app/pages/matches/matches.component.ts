import { Component, OnInit, ViewChild } from '@angular/core';
import { MatchService } from 'src/app/services/match-service/match.service';
import { tap, map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Match } from 'src/app/models/marches';
import { ModalComponent } from 'src/app/components/modal/modal.component';

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

  @ViewChild('modal') modal: ModalComponent;

  detail: Match;

  private _matchs$: Observable<Match[]>;

  private _mastchsList$ = new BehaviorSubject(null);

  constructor(private _service: MatchService) {
    this.matchs = this._mastchsList$.asObservable();
  }

  ngOnInit() {
    this.fetchMaches();
  }

  onSearch($event) {
    this.fetchMaches($event);
  }

  onValueChanges($event) {
    this.fetchMaches($event);
  }

  onSubmitScore({first, secound}) {
    console.log(first, secound);
    if (first && secound) {
      this.modal.close();
    }
  }

  onRowClick($event: Match) {
    this.modal.open();
    this.detail = $event;
    this.modal.onClose().subscribe( () => {
      this.detail = null;
    });
  }

  private fetchMaches(values?: any): void {
    this._service.getAll(values).subscribe( matches => this._mastchsList$.next(matches));
  }
}
