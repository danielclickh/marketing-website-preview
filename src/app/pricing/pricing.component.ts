import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ThemeService} from "../common/services/theme.service";
import {PricingService} from "./pricing.service";
import {from, Observable, map} from "rxjs";
import {SeedSelectOption} from "../seed-ui/seed-select/seed-select.component";
import {RegionPricing} from "./pricing.protocol";

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PricingComponent {
  pricingDataPromise = this.pricingService.getPricingData();
  pricingPlansDataPromise = this.pricingService.getPricingPlansData();
  selectedRegion?: RegionPricing;
  readonly regionPridingHeaders: string[] = ['dimension', 'price', 'metering unit'];

  regionPricingDataObs: Observable<Array<SeedSelectOption<RegionPricing>>> = from(this.pricingService.getRegionPricingData()).pipe(
    map((pricingPerRegion) => {
      const regionPricing = pricingPerRegion.map(pricing => ({
        label: pricing.region,
        value: pricing
      }));
      this.selectedRegion = regionPricing[0].value;
      return regionPricing;
    })
  );
  themeObs = this.themeService.observeTheme();

  constructor(private readonly themeService: ThemeService,
              private readonly pricingService: PricingService) {
  }

}
