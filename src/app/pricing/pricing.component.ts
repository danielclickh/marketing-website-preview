import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ThemeService} from "../common/services/theme.service";
import {PricingService} from "./pricing.service";

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PricingComponent {
  pricingDataPromise = this.pricingService.getPricingData();
  themeObs = this.themeService.observeTheme();

  constructor(private readonly themeService: ThemeService,
              private readonly pricingService: PricingService) {
  }

}
