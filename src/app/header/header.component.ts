import {ChangeDetectionStrategy, Component} from '@angular/core';
import {HeaderService} from "./header.service";
import {CpTheme, ThemeService} from "../common/services/theme.service";
import {trackById} from '../common/utils/AngularUtils';
import {Observable} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  readonly trackById = trackById;
  headerDataPromise = this.headerService.getHeaderData();
  themeObs: Observable<CpTheme>;

  constructor(private readonly headerService: HeaderService,
              private readonly themeService: ThemeService) {
    this.themeObs = themeService.observeTheme();
  }

  switchTheme(theme: CpTheme) {
    this.themeService.setTheme(theme, true);
  }
}
