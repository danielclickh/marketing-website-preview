import {ChangeDetectionStrategy, Component} from '@angular/core';
import {HomepageService} from "./homepage.service";
import {ThemeService} from "../common/services/theme.service";
import {trackById} from "../common/utils/AngularUtils";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageComponent {
  trackById = trackById;
  homepageDataPromise = this.homepageService.getHomepageData();
  themeObs = this.themeService.observeTheme();

  constructor(private readonly homepageService: HomepageService,
              private readonly themeService: ThemeService) {
  }
}
