import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandingsComponent } from './standings.component';
import { CommonModule } from '@angular/common';
import { StandingsRoutingModule } from './standings-routing.module';
import { MatDividerModule, MatTabsModule } from '@angular/material';
import { ListModule } from 'src/app/components/list/list.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatchService } from 'src/app/services/match-service/match.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { ListComponent } from 'src/app/components/list/list.component';

describe('StandingsComponent', () => {
  let component: StandingsComponent;
  let fixture: ComponentFixture<StandingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        StandingsRoutingModule,
        MatDividerModule,
        MatTabsModule,
        ListModule
      ],
      declarations: [ StandingsComponent ],
      providers: [MatchService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create componet', () => {
    expect(component).toBeTruthy();
  });

  it('should display any', () => {
    const lists = fixture.debugElement.queryAll(By.directive(ListComponent));
    expect(lists.length).toBeTruthy();
  });
});
