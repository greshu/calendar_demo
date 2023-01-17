import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CalendarViewComponent } from './calendar-view.component';

describe('Calendar view tests ', () => {
  let component: CalendarViewComponent;
  let fixture: ComponentFixture<CalendarViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        AppRoutingModule,
      ],
      declarations: [],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should create time array', () => {
    expect(component.timeArray.length).toBe(10);
  });

  it('should display error message', () => {
    component.startTime = -1;
    component.endTime = 0;
    component.addEvent();
    expect(component.errorMessage).toBeDefined();
  });

  it('should display event', () => {
    component.startTime = 30;
    component.endTime = 123;
    component.addEvent();
    expect(component.events.length).toBe(1);
  });

  it('should display array of event', () => {
    component.eventsArrayJson = '[{start: 30, end: 120}, {start: 300, end: 330}, {start: 290, end: 330}]';
    component.addEventsArray();
    expect(component.events.length).toBe(3);
  });

  it('should display error if eventsArrayJson is not valid', () => {
    component.eventsArrayJson = '[{startttt: 30, end: 120}]';
    component.addEventsArray();
    expect(component.errorMessage).toBeDefined();
  });
});
