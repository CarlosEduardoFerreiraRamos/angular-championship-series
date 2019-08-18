import { Component, OnInit, ViewChild } from '@angular/core';
import { MatchService } from 'src/app/services/match-service/match.service';
import { tap, map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Match, ScoreDTO } from 'src/app/models/marches';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { pipe } from '@angular/core/src/render3';

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
    this.fetchMatches();
  }

  onSearch($event) {
    this.fetchMatches($event);
  }

  onValueChanges($event) {
    this.fetchMatches($event);
  }

  onSubmitScore($event) {
    if ($event.first && $event.second) {
      this.setScore($event, this.detail.id);
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

  onRandomScore() {
    this._service.getRandomNumbers().subscribe( (numbers: string) => {
      const [first, second] = numbers.split('\n').filter( v => v);
        this.setScore({first, second}, this.detail.id);
        this.modal.close();
    });
  }

  private fetchMatches(values?: any): void {
    this._service.getAll(values).subscribe( matches => this._mastchsList$.next(matches));
  }

  private setScore(values: any, matchId: number): void {
    const score = new ScoreDTO({...values, matchId});
    this._service.setMatchScore(score).subscribe( () => {
      this.fetchMatches();
    });
  }
}
