import {ChangeDetectionStrategy, Component, Inject, PLATFORM_ID} from '@angular/core';
import {StrapiService} from "../common/services/strapi.service";

@Component({
  selector: 'app-homepage-layout',
  templateUrl: './homepage-layout.component.html',
  styleUrls: ['./homepage-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageLayoutComponent {

  constructor(private readonly strapiService: StrapiService,
              @Inject(PLATFORM_ID) private platformId: Object) {
  }
}
