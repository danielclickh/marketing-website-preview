import {Injectable} from '@angular/core';
import {StrapiService} from "../common/services/strapi.service";
import {Event, NewsAndEventsData} from "./news-and-events.protocol";

@Injectable({
  providedIn: 'root'
})
export class NewsAndEventsService {

  constructor(private readonly strapiService: StrapiService) {
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
      ]
    });

    const eventsData = eventsRes.data;
    const events: Array<Event> = eventsData.map((eventWithAttributes: any) => {
      const event = eventWithAttributes.attributes;
      return {
        id: eventWithAttributes.id,
        ...event,
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
    })

    const attributes = newsRes.data.attributes;
    return {
      ...attributes,
      events,
    };
  }
}
