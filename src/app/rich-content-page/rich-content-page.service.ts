import {Injectable} from '@angular/core';
import {StrapiService} from "../common/services/strapi.service";
import {Router} from "@angular/router";
import {RichContentPageData} from "./rich-content-page.protocol";

@Injectable({
  providedIn: 'root'
})
export class RichContentPageService {


  constructor(private readonly strapiService: StrapiService,
              private readonly router: Router) {
  }

  async getRichContentPageData(): Promise<RichContentPageData> {
    const url = this.router.url
      .replace(/\?.*/g, '');
    const res = await this.strapiService.getStrapi().find('rich-content-pages', {
      populate: ['*'],
      filters: [
        {field: 'url', operator: '$startsWith', value: url}
      ]
    });

    return this.strapiService.convertStrapiObject<RichContentPageData>(res.data?.[0]);
  }
}
