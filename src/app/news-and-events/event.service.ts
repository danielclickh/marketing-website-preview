import {Injectable} from '@angular/core';
import {Event} from "./news-and-events.protocol";
import {StrapiFindParams, StrapiService} from "../common/services/strapi.service";

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

  async getEvent(eventIdOrSlug: string | number): Promise<Event> {
    const params: StrapiFindParams = {
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
      ],

      fields: [
        'title',
        'shortDescription',
      ]
    };
    if (typeof eventIdOrSlug === 'string') {
      params.filters = [{field: 'slug', operator: '$eq', value: eventIdOrSlug}];
    } else if (eventIdOrSlug !== undefined) {
      params.filters = [{field: 'id', operator: '$eq', value: eventIdOrSlug}];
    }
    const eventsRes: any = await this.strapiService.getStrapi().find('events', params);
    const result = this.strapiService.convertStrapiObject<Event>(eventsRes.data[0]);
    this.strapiService.setSeoTags({
      title: result.title,
      description: result.shortDescription,
      type: 'website',
      siteName: 'ClickHouse',
      image: result.thumbnailPng,
    });
    return result;
  }
}
