import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class CookiesConsentService {
  private readonly userConsent: BehaviorSubject<boolean|null>;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      const userConsent = localStorage.getItem('COOKIES_CONSENT');
      const consentValue: boolean|null = userConsent? JSON.parse(userConsent) : null;
      this.userConsent = new BehaviorSubject<boolean | null>(consentValue);
    } else {
      this.userConsent = new BehaviorSubject<boolean | null>(null);
    }
  }

  getUserConsent(): Observable<boolean|null> {
    return this.userConsent;
  }

  setUserConsent(consent: boolean): void {
    localStorage.setItem('COOKIES_CONSENT', JSON.stringify(consent));
    this.userConsent.next(consent);
  }
}
