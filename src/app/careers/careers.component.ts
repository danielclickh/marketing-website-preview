import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ThemeService} from "../common/services/theme.service";
import {CareersService} from "./careers.service";

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareersComponent {
  careersDataPromise = this.careersService.getCareersData();
  themeObs = this.themeService.observeTheme();

  constructor(private readonly careersService: CareersService,
              private readonly themeService: ThemeService) {
  }

}
