import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ThemeService} from "../../services/theme.service";
import {GrowingCommunityService} from "./growing-community.service";

@Component({
  selector: 'growing-community',
  templateUrl: './growing-community.component.html',
  styleUrls: ['./growing-community.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GrowingCommunityComponent {
  growingCommunityDataPromise = this.growingCommunityService.getGrowingCommunityData();
  themeObs = this.themeService.observeTheme();

  constructor(private readonly growingCommunityService: GrowingCommunityService,
              private readonly themeService: ThemeService) {
  }

}
