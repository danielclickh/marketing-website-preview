import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ThemeService} from "../common/services/theme.service";
import {CustomerStoriesService} from "./customer-stories.service";

@Component({
  selector: 'app-customer-stories',
  templateUrl: './customer-stories.component.html',
  styleUrls: ['./customer-stories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerStoriesComponent {
  customerStoriesDataPromise = this.customerStoriesService.getCustomerStoriesData();
  themeObs = this.themeService.observeTheme();

  constructor(private readonly customerStoriesService: CustomerStoriesService,
              private readonly themeService: ThemeService) {
  }
}
