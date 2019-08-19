import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HomeModule } from './home.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatchService } from 'src/app/services/match-service/match.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './home-routing.module';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HomeModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [MatchService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const router = TestBed.get(Router);
    router.initialNavigation();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
