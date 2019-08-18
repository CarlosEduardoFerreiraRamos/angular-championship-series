import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { MatTableModule } from '@angular/material';
import { CommonModule } from '@angular/common';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatTableModule
      ],
      declarations: [ ListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should display', () => {
    const mockData = {name: 'Carlos', age: 30, email: 'email@gmail.com'};
    component.data = [mockData];
    fixture.detectChanges();
    const queryHeader = Array.from(fixture.debugElement.nativeElement.querySelectorAll('th')).map( (e: any) => e.innerText.toLowerCase());
    const queryRow = Array.from(fixture.debugElement.nativeElement.querySelectorAll('td')).map( (e: any) => e.innerText.toLowerCase());
    const hasAllHeaders = Object.keys(mockData)
      .reduce( (result: boolean, key: string) => result && queryHeader.includes(key.toLowerCase()) , true);
    const hasAllRows = Object.values(mockData)
      .map( v => `${v}`)
      .reduce( (result: boolean, key: string) => result && queryRow.includes(key.toLowerCase()) , true);
    expect(hasAllHeaders && hasAllRows).toBeTruthy();
  });


  it('should respond to user input', () => {
    const mockData = {name: 'Carlos', age: 30, email: 'email@gmail.com'};
    component.data = [mockData];
    fixture.detectChanges();
    const rowClickSpy = spyOn(component, 'onRowClick');
    fixture.debugElement.nativeElement.querySelector('td').click();
    expect(rowClickSpy).toHaveBeenCalled();
  });
});
