import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {environment} from "../../../environments/environment";
import {NavigationEnd, Router} from "@angular/router";
import {isPlatformBrowser, isPlatformServer} from "@angular/common";
import {CookiesConsentService} from "../../cookies-consent/cookies-consent.service";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SegmentProperties = Record<string, any>;

// See reference in: https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/
export interface SegmentAnalytics {
  _writeKey: string;
  load: (key: string, loadOptions?: any) => void;
  page: (category?: string, name?: string, properties?: Record<string, any>, options?: Record<string, any>, callback?: () => void) => void;
  track: (event?: string, properties?: Record<string, any>, options?: Record<string, any>, callback?: () => void) => void;
  identify: (userId?: string, traits?: Record<string, any>, options?: Record<string, any>, callback?: () => void) => void;
}

export type SegmentCategory = 'website-nav' | 'website-hero';
export type SegmentEventType = 'click' | 'Form Submitted';

@Injectable({
  providedIn: 'root'
})
export class SegmentService {
  constructor(@Inject(PLATFORM_ID) private platformId: object,
              private readonly cookiesService: CookiesConsentService,
              private readonly router: Router) {
    if (isPlatformBrowser(platformId)) {
      // this.cookiesService.getUserConsent().pipe(
      //   filter(consent => consent !== null),
      //   take(1)
      // ).subscribe(consent => {
      const analytics: SegmentAnalytics = this.getAnalytics();
      analytics._writeKey = environment.segmentKey;
      // const loaOptions = consent? {} : { disableClientPersistence: true };
      analytics.load(environment.segmentKey, {});

      this.router.events.subscribe(value => {
        if (value instanceof NavigationEnd) {
          this.reportPageView();
        }
      });
      // });
    }
  }


  reportPageView(): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.getAnalytics().page();
  }

  identify(email: string, firstName?: string, lastName?: string, userId?: string): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }
    this.getAnalytics().identify(userId, {email, firstName, lastName});
  }

  trackGaEvent(event: SegmentEventType,
               label: string,
               category: SegmentCategory,
               properties?: SegmentProperties): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }
    if (!properties) {
      properties = {};
    }
    properties = {
      ...properties,
      label,
      category
    };
    this.trackEvent(event, properties);
  }

  trackEvent(event: SegmentEventType, properties: Record<string, any>): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }
    this.getAnalytics().track(event, properties);
  }

  // Note: must use this method rather than save window.analytics in this class because it uses a factory.
  private getAnalytics(): SegmentAnalytics {
    return (window as any).analytics;
  }
}
