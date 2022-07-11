import {Injectable} from '@angular/core';
import {StrapiService} from "../common/services/strapi.service";
import {Router} from "@angular/router";
import {RichContentPageData} from "./rich-content-page.protocol";
import {marked} from "marked";

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

    const data: any = res.data;
    const attributes = data[0].attributes;
    return {...attributes, content: marked.parse(attributes.content)};
  }
}
