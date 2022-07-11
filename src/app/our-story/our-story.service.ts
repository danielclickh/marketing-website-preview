import {Injectable} from '@angular/core';
import {StrapiService} from "../common/services/strapi.service";
import {OurStoryData} from "./our-story.protocol";

@Injectable({
  providedIn: 'root'
})
export class OurStoryService {

  constructor(private readonly strapiService: StrapiService) {
  }

  async getOurStoryData(): Promise<OurStoryData> {
    const res = await this.strapiService.getStrapi().find('our-story', {
      populate: [
        'hero',
        'hero.imagePng',
        'hero.offices',
        'hero.offices.flagPng',
        'aboutUs',
        'aboutUs.items',
        'aboutUs.items.imagePng',
        'ourHistory',
        'ourHistory.items',
        'hiring',
        'hiring.ctaButton',
        'team',
        'team.founders',
        'team.founders.profileImagePng',
        'team.investors',
        'team.investors.profileImagePng',
        'team.darkInvestorLogosPng',
        'team.lightInvestorLogosPng',
        'seo',
        'seo.image',
      ]
    });

    const data: any = res.data;
    const attributes = data.attributes;
    const hero = attributes.hero;
    const aboutUs = attributes.aboutUs;
    const ourHistory = attributes.ourHistory;
    const hiring = attributes.hiring;
    const team = attributes.team;
    this.strapiService.setSeoTags(attributes.seo);

    return {
      hero: {
        ...hero,
        imagePngUrl: this.strapiService.extractImageUrl(hero.imagePng),
        offices: hero.offices.map((office: any) => {
          return {...office, flagPngUrl: this.strapiService.extractImageUrl(office.flagPng)};
        })
      },
      aboutUs: {
        ...aboutUs,
        items: aboutUs.items.map((item: any) => {
          return {...item, imagePngUrl: this.strapiService.extractImageUrl(item.imagePng)}
        })
      },
      ourHistory,
      hiring,
      team: {
        ...team,
        founders: team.founders.map((founder: any) => {
          return {...founder, profileImagePngUrl: this.strapiService.extractImageUrl(founder.profileImagePng)}
        }),
        investors: team.investors.map((investor: any) => {
          return {...investor, profileImagePngUrl: this.strapiService.extractImageUrl(investor.profileImagePng)}
        }),
        darkInvestorLogosPngUrls: team.darkInvestorLogosPng.data.map((logo: any) => logo.attributes.url),
        lightInvestorLogosPngUrls: team.lightInvestorLogosPng.data.map((logo: any) => logo.attributes.url),
      }
    };
  }
}
