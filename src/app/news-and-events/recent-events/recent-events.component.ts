import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {EventService} from "../event.service";
import {Event} from "../news-and-events.protocol";

@Component({
  selector: 'recent-events',
  templateUrl: './recent-events.component.html',
  styleUrls: ['./recent-events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentEventsComponent implements OnInit {
  pastEvents?: Array<Event>;

  @Input()
  allEvents?: Array<Event>;

  @Input()
  excludeEventId?: number;

  constructor(private readonly eventService: EventService,
              private readonly cd: ChangeDetectorRef) {
  }

  async ngOnInit() {
    const allEvents = this.allEvents ?? await this.eventService.getEvents();
    const pastEvents = this.eventService.extractPastEvents(allEvents)
      .filter(event => event.id !== this.excludeEventId);
    this.pastEvents = pastEvents.slice(0, 3);
    this.cd.detectChanges();
  }

  getEventUrl(event: Event) {
    return this.eventService.getEventUrl(event);
  }
}
