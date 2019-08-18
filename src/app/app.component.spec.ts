import { TestBed, async, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { MatToolbar } from '@angular/material';
import { DebugElement, NgModuleFactoryLoader } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import {RouterTestingModule} from '@angular/router/testing';

import { routes } from './app-routing.module';
import { HomeModule } from './pages/home/home.module';
import { MatchesModule } from './pages/matches/matches.module';
import { StandingsModule } from './pages/standings/standings.module';

describe('AppComponent', () => {
  let location: Location;
  // let router: Router;
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AppModule,
        RouterTestingModule.withRoutes(routes)
      ]
    }).compileComponents().then( () => {
      location = TestBed.get(Location);
      fixture = TestBed.createComponent(AppComponent);
      app = fixture.debugElement.componentInstance;
    });
  }));

  it('should create the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    expect(app).toBeTruthy();
  });

  it(`should display header`, () => {
    const toolbar: DebugElement = fixture.debugElement.query(By.directive(MatToolbar));
    expect(toolbar.componentInstance).toBeTruthy();
  });

  it('navigate to "" redirects you to /home', fakeAsync(() => {
    const router = TestBed.get(Router);
    router.initialNavigation();
    const loader = TestBed.get(NgModuleFactoryLoader);

    const path = './pages/home/home.module#HomeModule';
    const pathName = 'home';
    loader.stubbedModules =  {
      [path]: HomeModule
    };

    router.resetConfig([
      { path: pathName, loadChildren: path },
      { path: '**', redirectTo: pathName}
    ]);

    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/home');
  }));

  it('navigate to matches', fakeAsync(() => {
    const router = TestBed.get(Router);
    router.initialNavigation();
    const loader = TestBed.get(NgModuleFactoryLoader);

    const path = './pages/matches/matches.module#MatchesModule';
    const pathName = 'matches';
    loader.stubbedModules =  {
      [path]: MatchesModule
    };

    router.resetConfig([
      { path: pathName, loadChildren: path }
    ]);

    router.navigate([pathName]);
    tick();
    expect(location.path()).toBe(`/${pathName}`);
  }));

  it('navigate to standings', fakeAsync(() => {
    const router = TestBed.get(Router);
    router.initialNavigation();
    const loader = TestBed.get(NgModuleFactoryLoader);

    const path = './pages/standings/standings.module#StandingsModule';
    const pathName = 'standings';
    loader.stubbedModules =  {
      [path]: StandingsModule
    };

    router.resetConfig([
      { path: pathName, loadChildren: path }
    ]);

    router.navigate([pathName]);
    tick();
    expect(location.path()).toBe(`/${pathName}`);
  }));
});
