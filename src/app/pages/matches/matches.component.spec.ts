import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesComponent } from './matches.component';
import { MatchService } from 'src/app/services/match-service/match.service';
import { CommonModule } from '@angular/common';
import { MatchesRoutingModule } from './matches-routing.module';
import {
  MatInputModule,
  MatDatepickerModule,
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  MatNativeDateModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'src/app/components/modal/modal.module';
import { FormModule } from 'src/app/components/form/form.module';
import { ListModule } from 'src/app/components/list/list.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Match, Playoffs, Group, Team } from 'src/app/models/marches';

describe('MatchesComponent', () => {
  let component: MatchesComponent;
  let fixture: ComponentFixture<MatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatchesRoutingModule,
        MatInputModule,
        MatDatepickerModule,
        MatButtonModule,
        MatIconModule,
        MatNativeDateModule,
        MatDividerModule,
        FormsModule,
        ModalModule,
        FormModule,
        ListModule
      ],
      declarations: [ MatchesComponent ],
      providers: [MatchService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open score setter', async () => {
    const mockTeam = {
      name: '',
      type: Playoffs.QUARTER_FINALS,
      group: Group.B
    };

    mockTeam.name = 'ALPHA';
    const teamOne = new Team(mockTeam);

    mockTeam.name = 'BETA';
    const teamTwo = new Team(mockTeam);

    const match = new Match();
    match.id = 1;
    match.date = new Date();
    match.played = false;
    match.score = [];
    match.type = Playoffs.QUARTER_FINALS;
    match.teams = [teamOne, teamTwo];

    component.onRowClick(match);

    fixture.detectChanges();
    await fixture.whenStable();
    const e = fixture.debugElement.nativeElement.offsetParent.querySelector('.score-setter');
    expect(e).toBeTruthy();
  });

  it('should open score display', async () => {
    const mockTeam = {
      name: '',
      type: Playoffs.QUARTER_FINALS,
      group: Group.B
    };

    mockTeam.name = 'ALPHA';
    const teamOne = new Team(mockTeam);

    mockTeam.name = 'BETA';
    const teamTwo = new Team(mockTeam);

    const match = new Match();
    match.id = 1;
    match.date = new Date();
    match.played = true;
    match.score = [2, 1];
    match.type = Playoffs.QUARTER_FINALS;
    match.teams = [teamOne, teamTwo];
    match.winner = teamOne;

    component.onRowClick(match);

    fixture.detectChanges();
    await fixture.whenStable();
    const e = fixture.debugElement.nativeElement.offsetParent.querySelector('.score-display');
    expect(e).toBeTruthy();
  });
});
