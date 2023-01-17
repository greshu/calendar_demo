import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EventModel } from 'src/app/models/event.model';
import { AppValidator } from 'src/app/utilities/app-validator';

@Component({
  selector: 'app-calendar-view',
  styleUrls: ['./calendar-view.component.scss'],
  templateUrl: './calendar-view.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CalendarViewComponent implements OnInit {
  // List of working hours
  timeArray: any = [];

  // Events entered by user
  events: EventModel[] = [];

  // input from user for single event
  startTime: any;
  endTime: any;

  // input from user for array of events
  eventsArrayJson: any;

  // error message to show error in template
  errorMessage?: string;

  private heightOfCell = 60;

  //Random colors for events
  private colors = ['#ffc1c1', '#c6fada', '#fff794', '#ffd5ef', '#d7d5ff'];

  constructor() {}

  ngOnInit(): void {
    this.createTimeArray();
  }

  // Add single event by user
  addEvent = () => {
    this.events = [];
    this.errorMessage = AppValidator.validateEvent(
      this.startTime,
      this.endTime
    );
    if (this.errorMessage) {
      return;
    }
    this.events.push({
      start: this.startTime,
      end: this.endTime,
    });
    this.resetTime();
    this.resetErrorMessage();
    this.displayEvent();
  };

  // clear error message
  resetErrorMessage = () => {
    this.errorMessage = undefined;
  };

  addEventsArray = () => {
    this.errorMessage = '';
    // covert string to array of events object
    var eventsFromJson: any = AppValidator.stringToObject(this.eventsArrayJson);
    if (eventsFromJson) {
      eventsFromJson.find((eve: any) => {
        // Validating JSON
        if (eve.hasOwnProperty('start') && eve.hasOwnProperty('end')) {
          let isError = AppValidator.validateEvent(eve.start, eve.end);
          if (isError) {
            this.errorMessage = 'Error in JSON';
            return true;
          }
          return false;
        } else {
          this.errorMessage = 'Error in JSON';
          return true;
        }
      });
      if (!this.errorMessage) {
        // Display events if JSON is correct
        this.events = eventsFromJson;
        this.displayEvent();
      }
    } else {
      this.errorMessage = 'Error in JSON';
    }
  };

  // Display event in calander
  private displayEvent() {
    for (let index = 0; index < this.events.length; index++) {
      let start = this.events[index].start;
      let end = this.events[index].end;
      let height = this.calculateHeight(start, end);
      let idOfTarget = this.getDivId(start);
      let div = document.createElement('div');
      div.className = 'chip';
      div.style.height = height + 'px';
      div.style.marginTop = this.calculateMarginTop(start) + 'px';
      div.style.backgroundColor =
        this.colors[Math.floor(Math.random() * this.colors.length)];
      div.innerHTML = `${start} - ${end}`;
      document.getElementById(idOfTarget)?.appendChild(div);
    }
  }

  // To create an array of working hours with am/pm to display in template
  private createTimeArray = () => {
    for (let index = 9; index <= 18; index++) {
      if (index > 12) {
        this.timeArray.push({
          time: index - 12 + ' pm',
        });
      } else {
        this.timeArray.push({
          time: index == 12 ? index + ' pm' : index + ' am',
        });
      }
    }
  };

  // Get id of div where events needs to be displayed
  private getDivId = (start: number) => {
    return Math.floor(start / 60).toString();
  };

  // Calculate height of event
  private calculateHeight = (start: number, end: number) => {
    return Math.floor(((end - start) / 60) * this.heightOfCell);
  };

  // calculate margin where event needs to start
  private calculateMarginTop = (num: number) => {
    return num % this.heightOfCell;
  };

  // Reset input
  private resetTime = () => {
    this.startTime = undefined;
    this.endTime = undefined;
  };
}
