import {Injectable} from '@angular/core';
import {StrapiService} from "../common/services/strapi.service";
import {Event, NewsAndEventsData} from "./news-and-events.protocol";
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
        'seo',
        'seo.image',
      ]
    });


    const allEvents = await this.eventService.getEvents();
    let featuredEvent: Event | undefined;
    let featuredEventIndex = allEvents.findIndex((e) => e.featured);
    if (featuredEventIndex !== undefined) {
      featuredEvent = allEvents.splice(featuredEventIndex, 1)?.[0];
    }

    const pastEvents = this.eventService.extractPastEvents(allEvents);
    const upcomingEvents = this.eventService.extractUpcomingEvents(allEvents);
    if (!featuredEvent) {
      featuredEvent = upcomingEvents.shift();
    }

    const attributes = newsRes.data.attributes;
    this.strapiService.setSeoTags(attributes.seo);

    return {
      ...attributes,
      featuredEvent,
      upcomingEvents,
      pastEvents,
    };
  }
}
