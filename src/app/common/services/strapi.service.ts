import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {environment} from "../../../environments/environment";
import {ThemeService} from "./theme.service";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, combineLatest, filter, firstValueFrom, map, Observable, take} from "rxjs";
import {isPlatformServer} from "@angular/common";
import {SeoMetadata} from "../protocol/common.protocol";
import {Meta, Title} from "@angular/platform-browser";

export type StrapiFilterOperator =
  '$eq' |
  '$ne' |
  '$lt' |
  '$lte' |
  '$gt' |
  '$gte' |
  '$in' |
  '$notIn' |
  '$contains' |
  '$notContains' |
  '$containsi' |
  '$notContainsi' |
  '$null' |
  '$notNull' |
  '$between' |
  '$startsWith' |
  '$endsWith' |
  '$or' |
  '$and';

export interface StrapiFilter {
  field: string;
  operator: StrapiFilterOperator;
  value: string | number;
}

export interface StrapiFindParams {
  populate?: Array<string>;
  sort?: Array<string>;
  filters?: Array<StrapiFilter>;
  fields?: Array<string>;
}

export class StrapiClient {

  constructor(private readonly httpClient: HttpClient,
              private readonly firstRequestSent: BehaviorSubject<boolean>,
              private readonly inflightRequestsSubject: BehaviorSubject<number>,
              private readonly platformId: object) {
  }

  /**
   * /api/blog-posts?sort%5B0%5D=publishedAt%3ADESC&populate%5B0%5D=author&populate%5B1%5D=author.avatarPng&populate%5B2%5D=thumbnailPng
   * '/api/blog-posts?sort[0]=publishedAt:DESC&populate[0]=author&populate[1]=author.avatarPng&populate[2]=thumbnailPng'
   */
  async find(contentType: string, params: StrapiFindParams): Promise<any> {
    try {
      this.inflightRequestsSubject.next(this.inflightRequestsSubject.value + 1);
      this.firstRequestSent.next(true);
      let baseUrl: string = environment.strapiBaseUrl;
      if (isPlatformServer(this.platformId)) {
        baseUrl = environment.ssrApiStrapiBaseUrl;
      }
      let url = `${baseUrl}/api/${contentType}`;
      const urlParams: Array<string> = [];
      if (params.sort) {
        for (let i = 0; i < params.sort.length; i++) {
          const sortElement = params.sort[i];
          const key = encodeURI(`sort[${i}]`);
          const value = encodeURI(sortElement);
          urlParams.push(`${key}=${value}`);
        }
      }

      if (params.filters) {
        for (const filter of params.filters) {
          urlParams.push(`filters[${filter.field}][${filter.operator}]=${filter.value}`);
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

      if (params.fields) {
        for (let i = 0; i < params.fields.length; i++) {
          const fieldsElement = params.fields[i];
          const key = encodeURI(`fields[${i}]`);
          const value = encodeURI(fieldsElement);
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
  private readonly strapiClient = new StrapiClient(this.httpClient, this.firstRequestSent, this.inflightRequestsCounter, this.platformId);

  constructor(private readonly themeService: ThemeService,
              private readonly httpClient: HttpClient,
              @Inject(PLATFORM_ID) private platformId: object,
              private readonly meta: Meta,
              private readonly title: Title) {
  }

  setSeoTags(rawSeo?: any) {
    if (rawSeo === undefined) {
      return;
    }

    const seoMetadata: SeoMetadata = {
      ...rawSeo,
      imageUrl: rawSeo.image ? rawSeo.image.url : undefined
    }

    if (seoMetadata.title) {
      this.title.setTitle(seoMetadata.title);
      for (const tagName of ['og:title', 'twitter:title']) {
        this.meta.addTag({name: tagName, content: seoMetadata.title});
      }
    }

    if (seoMetadata.keywords) {
      this.meta.addTag({name: 'keywords', content: seoMetadata.keywords});
    }

    if (seoMetadata.description) {
      for (const tagName of ['description', 'twitter:description', 'og:description']) {
        this.meta.addTag({name: tagName, content: seoMetadata.description});
      }
    }

    if (seoMetadata.type) {
      this.meta.addTag({name: 'og:type', content: seoMetadata.type});
    }

    if (seoMetadata.siteName) {
      this.meta.addTag({name: 'og:site_name', content: seoMetadata.siteName});
    }

    if (seoMetadata.imageUrl) {
      this.meta.addTag({name: 'og:image', content: seoMetadata.imageUrl});
    }
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

  convertStrapiObject<T>(strapiObject: any): T {
    if (!strapiObject) {
      return strapiObject;
    }

    if (Array.isArray(strapiObject)) {
      return strapiObject.map(i => this.convertStrapiObject(i)) as unknown as T;
    }

    const result: any = {};
    const objectContent = this.getStrapiObjectAttributes(strapiObject);
    for (const entry of Object.entries(objectContent)) {
      const field: string = entry[0];
      const fieldValue: any = entry[1];

      if (Array.isArray(fieldValue)) {
        result[field] = fieldValue.map(i => this.convertStrapiObject(i));
        continue;
      }

      if (typeof fieldValue === 'object' && fieldValue) {
        if ('data' in fieldValue && Array.isArray(fieldValue.data)) {
          result[field] = fieldValue.data.map((i: any) => this.convertStrapiObject(i));
          continue;
        }
        let convertedObj: any = this.convertStrapiObject(fieldValue);
        if ('data' in convertedObj && Object.keys(convertedObj).length === 1) {
          convertedObj = convertedObj.data;
        }

        result[field] = convertedObj;
        if (convertedObj?.ext === '.svg') {
          const url = environment.strapiBaseUrl + convertedObj.url;
          this.themeService.registerIcon(convertedObj.hash, url);
        }
        continue;
      }

      result[field] = fieldValue;
    }

    return result as T;
  }

  isStrapiObject(obj: any) {
    return 'attributes' in obj && 'id' in obj;
  }

  getStrapiObjectAttributes(obj: any) {
    return this.isStrapiObject(obj) ? {id: obj.id, ...obj.attributes} : obj;
  }

  getStrapi() {
    return this.strapiClient;
  }
}
