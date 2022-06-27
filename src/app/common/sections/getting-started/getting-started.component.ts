import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ThemeService} from "../../services/theme.service";
import {GettingStartedService} from "./getting-started.service";

@Component({
  selector: 'getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GettingStartedComponent {
  gettingStartedDataPromise = this.gettingStartedService.getGettingStartedData();

  constructor(private readonly gettingStartedService: GettingStartedService,
              private readonly themeService: ThemeService) {
  }
}
