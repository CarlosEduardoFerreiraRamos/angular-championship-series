import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { Component, DebugElement } from '@angular/core';
import { ModalModule } from './modal.module';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({template: `
  <app-modal>
    <div class="target">INNER_TEXT</div>
  </app-modal>
`})
export class TestModalComponent {}

describe('ModalComponent', () => {
  let fixture: ComponentFixture<TestModalComponent>;
  let overlayContainerElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModalModule, BrowserAnimationsModule],
      declarations: [ TestModalComponent ],
      providers: [{
        provide: OverlayContainer,
        useFactory: () => {
          overlayContainerElement = document.createElement('div')
          return { getContainerElement: () => overlayContainerElement }
        }
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestModalComponent);
    fixture.detectChanges();
  });

  it('should create component', () => {
    const modalComp: ModalComponent = fixture.debugElement.query(By.directive(ModalComponent)).componentInstance;
    expect(modalComp).toBeTruthy();
  });

  it('should display', () => {
    const debug: DebugElement = fixture.debugElement.query(By.directive(ModalComponent));
    const modalComp: ModalComponent = debug.componentInstance;
    modalComp.open();
    fixture.detectChanges();
    const content = overlayContainerElement.querySelector<HTMLElement>('.target').innerText;
    expect(content).toEqual('INNER_TEXT');
  });
});
