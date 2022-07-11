import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ThemeService} from "../common/services/theme.service";
import {NewsAndEventsService} from "./news-and-events.service";
import {EventService} from "./event.service";
import {Event} from "./news-and-events.protocol";

@Component({
  selector: 'app-news-and-events',
  templateUrl: './news-and-events.component.html',
  styleUrls: ['./news-and-events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsAndEventsComponent {
  newsAndEventsDataPromise = this.newsAndEventsService.getNewsAndEventsData();
  themeObs = this.themeService.observeTheme();

  constructor(private readonly newsAndEventsService: NewsAndEventsService,
              private readonly themeService: ThemeService,
              private readonly eventService: EventService) {
  }

  getEventUrl(event: Event) {
    return this.eventService.getEventUrl(event);
  }
}
