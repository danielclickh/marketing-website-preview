import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {isPlatformBrowser} from "@angular/common";

export interface UtmParameters {
  utm_campaign?: string;
  utm_medium?: string;
  utm_source?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UtmService {

  constructor(@Inject(PLATFORM_ID) private platformId: object,
              private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute) {
    if (isPlatformBrowser(platformId)) {
      this.router.events.subscribe(value => {
        if (value instanceof NavigationEnd) {
          const params = activatedRoute.snapshot.queryParams;
          const utmCampaign = params['utm_campaign'];
          const utmMedium = params['utm_medium'];
          const utmSource = params['utm_source'];
          if (utmCampaign || utmMedium || utmSource) {
            const utmParams: UtmParameters = {utm_campaign: utmCampaign, utm_medium: utmMedium, utm_source: utmSource};
            sessionStorage.setItem('utmParams', JSON.stringify(utmParams))
          }
        }
      });
    }
  }

  getUtmParams(): UtmParameters {
    const utmParamsStr = sessionStorage.getItem('utmParams');
    if (!utmParamsStr) {
      return {};
    }
    return JSON.parse(utmParamsStr);
  }
}
