import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {StrapiService} from "./common/services/strapi.service";
import {isPlatformBrowser} from "@angular/common";
import {Observable, of, take} from "rxjs";
import {CookiesConsentService} from "./cookies-consent/cookies-consent.service";
import {MatDialog} from "@angular/material/dialog";
import {CookiesConsentComponent} from "./cookies-consent/cookies-consent.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  pageReady: Observable<boolean>;

  constructor(private readonly strapiService: StrapiService,
              private readonly cookiesService: CookiesConsentService,
              private readonly dialog: MatDialog,
              @Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.pageReady = this.strapiService.observeNoInflightRequests();
      this.cookiesService.getUserConsent().pipe(take(1)).subscribe(userConsent => {
        if (userConsent === null) {
          this.showCookiesConsentDialog();
        }
      });
    } else {
      this.pageReady = of(false);
    }
  }

  showCookiesConsentDialog(): void {
    this.dialog.open(CookiesConsentComponent, {
      width: '100%',
      maxWidth: '672px',
      autoFocus: false,
      restoreFocus: false,
      panelClass: 'modal',
      position: {bottom: '32px'},
      disableClose: true
    });
  }
}
