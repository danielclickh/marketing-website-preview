import {Injectable} from '@angular/core';
import {StrapiService} from "../common/services/strapi.service";
import {NewsAndEventsData} from "./news-and-events.protocol";
import {EventService} from "./event.service";

@Injectable({
  providedIn: 'root'
})
export class NewsAndEventsService {

  constructor(private readonly strapiService: StrapiService,
              private readonly eventService: EventService) {
  }

  async getNewsAndEventsData(): Promise<NewsAndEventsData> {
    const newsRes: any = await this.strapiService.getStrapi().find('news-and-event', {
      populate: [
        'hero',
        'newsItems',
        'newsItems.ctaButton',
        'pressReleases',
        'pressReleases.ctaButton',
      ]
    });


    const allEvents = await this.eventService.getEvents();
    const upcomingEvents = this.eventService.extractUpcomingEvents(allEvents);
    const pastEvents = this.eventService.extractPastEvents(allEvents);
    const featuredEvent = upcomingEvents.shift();
    const attributes = newsRes.data.attributes;

    return {
      ...attributes,
      featuredEvent,
      upcomingEvents,
      pastEvents,
    };
  }
}
