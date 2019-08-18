import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { Component, DebugElement } from '@angular/core';
import { ModalModule } from './modal.module';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({template: `
  <app-modal>
    INNER_TEXT
  </app-modal>
`})
export class TestModalComponent {}

describe('ModalComponent', () => {
  let component: TestModalComponent;
  let fixture: ComponentFixture<TestModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModalModule, BrowserAnimationsModule],
      declarations: [ TestModalComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestModalComponent);
    component = fixture.componentInstance;
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
    const content = fixture.debugElement.nativeElement.offsetParent.querySelector('mat-dialog-container').innerText;
    expect(content).toEqual('INNER_TEXT');
  });
});
