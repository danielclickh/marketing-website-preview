import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {StrapiService} from "./common/services/strapi.service";
import {isPlatformBrowser} from "@angular/common";
import {Observable, of, take} from "rxjs";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  pageReady: Observable<boolean>;

  constructor(private readonly strapiService: StrapiService,
              private readonly dialog: MatDialog,
              @Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.pageReady = this.strapiService.observeNoInflightRequests();
    } else {
      this.pageReady = of(false);
    }
  }
}
