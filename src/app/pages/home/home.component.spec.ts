import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatchService } from 'src/app/services/match-service/match.service';
import { CommonModule } from '@angular/common';
import { MatDividerModule, MatProgressSpinnerModule } from '@angular/material';
import { ListModule } from 'src/app/components/list/list.module';
import { Input, HostListener, Directive } from '@angular/core';

@Directive({
  selector: '[routerLink]'
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        RouterLinkDirectiveStub
      ],
      imports: [
        HttpClientTestingModule,
        CommonModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        ListModule
      ],
      providers: [MatchService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
