import {Injectable} from '@angular/core';
import {StrapiService} from "../common/services/strapi.service";
import {CareersData, Position} from "./careers.protocol";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CareersService {

  constructor(private readonly strapiService: StrapiService,
              private readonly httpClient: HttpClient) {
  }

  async getCareersData(): Promise<CareersData> {
    const res = await this.strapiService.getStrapi().find('career', {
      populate: [
        'hero',
        'hero.companyImages',
        'companyValues',
        'companyValues.iconSvg',
        'seo',
        'seo.image',
      ]
    });

    const careersData = this.strapiService.convertStrapiObject<CareersData>(res.data);
    this.strapiService.setSeoTags(careersData.seo);
    return careersData;
  }


  async getOpenPositions(): Promise<Array<Position>> {
    const results: any = await firstValueFrom(this.httpClient.get('https://boards-api.greenhouse.io/v1/boards/clickhouse/jobs?content=true'));
    return results.jobs!;
  }
}
