import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ThemeService} from "../common/services/theme.service";
import {CloudService} from "./cloud.service";

@Component({
  selector: 'app-cloud',
  templateUrl: './cloud.component.html',
  styleUrls: ['./cloud.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CloudComponent {
  cloudDataPromise = this.cloudService.getCloudData();
  themeObs = this.themeService.observeTheme();

  constructor(private readonly cloudService: CloudService,
              private readonly themeService: ThemeService) {
  }

}
