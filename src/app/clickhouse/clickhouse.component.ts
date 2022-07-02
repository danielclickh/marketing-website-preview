import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ThemeService} from "../common/services/theme.service";
import {ClickhouseService} from "./clickhouse.service";

@Component({
  selector: 'app-clickhouse',
  templateUrl: './clickhouse.component.html',
  styleUrls: ['./clickhouse.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClickhouseComponent {
  clickhouseDataPromise = this.clickhouseService.getClickhouseData();
  themeObs = this.themeService.observeTheme();

  constructor(private readonly clickhouseService: ClickhouseService,
              private readonly themeService: ThemeService) {
  }

}
