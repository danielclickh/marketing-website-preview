import {Injectable} from '@angular/core';
import {Event} from "./news-and-events.protocol";
import {StrapiService} from "../common/services/strapi.service";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private readonly strapiService: StrapiService) {
  }

  getEventUrl(event: Event): string {
    return `/company/events/${event.slug ? event.slug : event.id}`;
  }

  async getEvents(): Promise<Array<Event>> {
    const eventsRes: any = await this.strapiService.getStrapi().find('events', {
      sort: [
        'localDatetime:DESC'
      ],
      populate: [
        'thumbnailPng',
        'hostedBy',
        'hostedBy.hosts',
        'hostedBy.hosts.avatarPng',
        'agenda',
        'agenda.items',
        'location',
        'darkFeatureImagePng',
        'lightFeatureImagePng',
        'form'
      ]
    });

    const events = this.strapiService.convertStrapiObject<Array<Event>>(eventsRes.data);
    const now = Date.now();
    return events.map((event: Event) => {
      return {
        ...event,
        eventEnded: new Date(event.localDatetime).getTime() < now,
      };
    });
  }

  extractUpcomingEvents(events: Array<Event>): Array<Event> {
    return events
      .filter((event) => !event.eventEnded)
      .sort((e1, e2) => new Date(e1.localDatetime).getTime() - new Date(e2.localDatetime).getTime());

  }

  extractPastEvents(events: Array<Event>) {
    return events.filter((event) => event.eventEnded);
  }
}
