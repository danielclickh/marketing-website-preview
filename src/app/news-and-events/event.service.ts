import {Injectable} from '@angular/core';
import {Event} from "./news-and-events.protocol";
import {StrapiService} from "../common/services/strapi.service";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private readonly strapiService: StrapiService) {
  }

  async getEvents(): Promise<Array<Event>> {
    const eventsRes: any = await this.strapiService.getStrapi().find('events', {
      sort: [
        'utcDatetime:DESC'
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

    const now = Date.now();
    const eventsData = eventsRes.data;
    return eventsData.map((eventWithAttributes: any) => {
      const event = eventWithAttributes.attributes;
      return {
        id: eventWithAttributes.id,
        ...event,
        eventEnded: new Date(event.utcDatetime).getTime() < now,
        thumbnailPngUrl: this.strapiService.extractImageUrl(event.thumbnailPng),
        hostedBy: {
          ...event.hostedBy,
          hosts: event.hostedBy.hosts.map((host: any) => {
            return {
              ...host,
              avatarPngUrl: this.strapiService.extractImageUrl(host.avatarPng)
            }
          })
        },
        darkFeatureImagePngUrl: this.strapiService.extractImageUrl(event.darkFeatureImagePng),
        lightFeatureImagePngUrl: this.strapiService.extractImageUrl(event.lightFeatureImagePng),
      };
    });
  }

  extractUpcomingEvents(events: Array<Event>): Array<Event> {
    return events
      .filter((event) => !event.eventEnded)
      .sort((e1, e2) => new Date(e1.utcDatetime).getTime() - new Date(e2.utcDatetime).getTime());

  }

  extractPastEvents(events: Array<Event>) {
    return events.filter((event) => event.eventEnded);
  }
}
