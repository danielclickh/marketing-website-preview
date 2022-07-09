import {ChangeDetectionStrategy, Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {StrapiService} from "../common/services/strapi.service";
import {isPlatformBrowser} from "@angular/common";
import {of} from "rxjs";

@Component({
  selector: 'app-homepage-layout',
  templateUrl: './homepage-layout.component.html',
  styleUrls: ['./homepage-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageLayoutComponent implements OnInit {

  constructor(private readonly strapiService: StrapiService,
              @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit(): void {
  }

  pageReady() {
    if (isPlatformBrowser(this.platformId)) {
      return this.strapiService.observeNoInflightRequests();
    }

    return of(false);
  }
}
