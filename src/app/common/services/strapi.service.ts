import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {ThemeService} from "./theme.service";
import {StrapiImageObject} from "../protocol/strapi.protocol";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, combineLatest, filter, firstValueFrom, map, Observable, take} from "rxjs";

export interface StrapiFindParams {
  populate?: Array<string>;
  sort?: Array<string>;
}

export class StrapiClient {

  constructor(private readonly httpClient: HttpClient,
              private readonly firstRequestSent: BehaviorSubject<boolean>,
              private readonly inflightRequestsSubject: BehaviorSubject<number>) {
  }

  /**
   * /api/blog-posts?sort%5B0%5D=publishedAt%3ADESC&populate%5B0%5D=author&populate%5B1%5D=author.avatarPng&populate%5B2%5D=thumbnailPng
   * '/api/blog-posts?sort[0]=publishedAt:DESC&populate[0]=author&populate[1]=author.avatarPng&populate[2]=thumbnailPng'
   */
  async find(contentType: string, params: StrapiFindParams): Promise<any> {
    try {
      this.inflightRequestsSubject.next(this.inflightRequestsSubject.value + 1);
      this.firstRequestSent.next(true);
      let url = `/api/${contentType}`;
      const urlParams: Array<string> = [];
      if (params.sort) {
        for (let i = 0; i < params.sort.length; i++) {
          const sortElement = params.sort[i];
          const key = encodeURI(`sort[${i}]`);
          const value = encodeURI(sortElement);
          urlParams.push(`${key}=${value}`);
        }
      }
      if (params.populate) {
        for (let i = 0; i < params.populate.length; i++) {
          const populateElement = params.populate[i];
          const key = encodeURI(`populate[${i}]`);
          const value = encodeURI(populateElement);
          urlParams.push(`${key}=${value}`);
        }
      }

      url += `?${urlParams.join('&')}`
      return await firstValueFrom(this.httpClient.get(url));
    } finally {
      this.inflightRequestsSubject.next(this.inflightRequestsSubject.value - 1);
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class StrapiService {
  private readonly firstRequestSent = new BehaviorSubject(false);
  private readonly inflightRequestsCounter = new BehaviorSubject(0);
  private readonly strapiClient = new StrapiClient(this.httpClient, this.firstRequestSent, this.inflightRequestsCounter);

  constructor(private readonly themeService: ThemeService,
              private readonly httpClient: HttpClient) {
  }

  observeNoInflightRequests(): Observable<boolean> {
    return combineLatest([this.firstRequestSent, this.inflightRequestsCounter]).pipe(
      filter(([firstRequestSent, inflightRequestCounter]) => !!firstRequestSent && inflightRequestCounter === 0),
      map(([ignored, inflightRequestCounter]) => {
        return inflightRequestCounter === 0
      }),
      take(1)
    )
  }

  getStrapi() {
    return this.strapiClient;
  }

  registerSvgIcon(iconObject?: StrapiImageObject): string | undefined {
    const iconObjectAttrs = iconObject?.data?.attributes;
    if (!iconObjectAttrs) {
      return undefined;
    }
    const url = environment.strapiBaseUrl + iconObjectAttrs.url;
    this.themeService.registerIcon(iconObjectAttrs.hash, url);
    return iconObjectAttrs.hash + '';
  }

  extractImageUrl(image: StrapiImageObject): string | undefined {
    return image.data?.attributes.url;
  }
}
