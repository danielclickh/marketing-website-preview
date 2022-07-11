import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {StrapiService} from "../common/services/strapi.service";
import {Router} from "@angular/router";
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(private readonly strapiService: StrapiService,
              private readonly router: Router,
              @Inject(PLATFORM_ID) private platformId: object) {
  }

  async redirectIfSpecified(): Promise<void> {
    const redirectRes: any = await this.strapiService.getStrapi().find('redirects', {
      populate: ['*']
    });

    const data = redirectRes.data;
    const redirectMap = new Map<string, string>();
    for (const redirectData of data) {
      const attributes = redirectData.attributes;
      redirectMap.set(attributes.from, attributes.to);
    }
    const url = this.router.url.replace(/\?.*/g, '');

    const foundRedirect = redirectMap.get(url);
    if (foundRedirect) {
      if (foundRedirect.startsWith('/')) {
        await this.router.navigateByUrl(foundRedirect);
        return;
      }
      if (isPlatformBrowser(this.platformId)) {
        window.location.href = foundRedirect;
        return;
      }
    }

    await this.router.navigateByUrl('/');
  }
}
