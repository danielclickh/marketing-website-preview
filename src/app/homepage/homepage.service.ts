import {Injectable} from '@angular/core';
import {StrapiService} from "../common/services/strapi.service";
import {HomepageData} from "./homepage.protocol";

@Injectable({
  providedIn: 'root'
})
export class HomepageService {
  constructor(private readonly strapiService: StrapiService) {
  }

  async getHomepageData(): Promise<HomepageData> {
    const res = await this.strapiService.getStrapi().find('homepage', {
      populate: [
        'hero',
        'hero.ctaButton',
        'hero.darkBackgroundIcon',
        'hero.lightBackgroundIcon',
        'hero.highlights',
        'aboutClickhouse',
        'aboutClickhouse.features',
        'aboutClickhouse.features.iconSvg',
        'aboutClickhouse.allFeaturesButton',
        'customerStories',
        'customerStories.logos',
        'customerStories.logos.darkLogoPng',
        'customerStories.logos.lightLogoPng',
        'customerStories.ctaButton',
        'clickhouseCloud',
        'clickhouseCloud.primaryButton',
        'clickhouseCloud.secondaryButton',
        'clickhouseCloudItems',
        'clickhouseCloudItems.bullets',
        'clickhouseCloudItems.screenshotPng',
        'testimonials',
        'testimonials.testimonialsIconSvg',
        'testimonials.bottomIconSvg',
        'testimonials.testimonialItems',
      ]
    });

    const data: any = res.data;
    const attributes = data.attributes;
    const hero = attributes.hero;
    const aboutClickhouse = attributes.aboutClickhouse;
    const customerStories = attributes.customerStories;
    const clickhouseCloud = attributes.clickhouseCloud;
    const clickhouseCloudItems = attributes.clickhouseCloudItems;
    const testimonials = attributes.testimonials;
    console.log('Homepage data: ', attributes);
    const result: HomepageData = {
      hero: {
        darkBackgroundIconUrl: hero.darkBackgroundIcon.data.attributes.url,
        lightBackgroundIconUrl: hero.lightBackgroundIcon.data.attributes.url,
        title: hero.title,
        description: hero.description,
        ctaButton: hero.ctaButton,
        highlights: hero.highlights
      },
      aboutClickhouse: {
        title: aboutClickhouse.title,
        allFeaturesButton: aboutClickhouse.allFeaturesButton,
        features: aboutClickhouse.features.map((feature: any) => {
          return {
            id: feature.id,
            title: feature.title,
            description: feature.description,
            iconSvgId: this.strapiService.registerSvgIcon(feature.iconSvg)
          }
        })
      },
      customerStories: {
        title: customerStories.title,
        description: customerStories.description,
        ctaButton: customerStories.ctaButton,
        logos: customerStories.logos.map((logo: any) => {
          return {
            id: logo.id,
            darkLogoPngUrl: logo.darkLogoPng.data.attributes.url,
            lightLogoPngUrl: logo.lightLogoPng.data.attributes.url,
            href: logo.href,
            target: logo.target
          }
        })
      },
      clickhouseCloud: {
        pretitle: clickhouseCloud.pretitle,
        title: clickhouseCloud.title,
        description: clickhouseCloud.description,
        primaryButton: clickhouseCloud.primaryButton,
        secondaryButton: clickhouseCloud.secondaryButton,
        items: clickhouseCloudItems.map((item: any) => {
          return {
            id: item.id,
            title: item.title,
            description: item.description,
            bullets: item.bullets.map((bullet: any) => bullet.text),
            screenshotPngUrl: item.screenshotPng.data.attributes.url
          }
        })
      },

      testimonials: {
        pretitle: testimonials.pretitle,
        title: testimonials.title,
        description: testimonials.description,
        testimonialsIconSvgId: this.strapiService.registerSvgIcon(testimonials.testimonialsIconSvg)!,
        bottomIconSvgId: this.strapiService.registerSvgIcon(testimonials.bottomIconSvg)!,
        items: testimonials.testimonialItems.map((item: any) => {
          return {
            id: item.id,
            title: item.title,
            author: item.author,
            href: item.href,
            target: item.target
          }
        })
      }
    };
    console.log('result', result);
    return result;
  }
}
