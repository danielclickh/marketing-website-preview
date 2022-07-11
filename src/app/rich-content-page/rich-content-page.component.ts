import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ThemeService} from "../common/services/theme.service";
import {RichContentPageService} from "./rich-content-page.service";

@Component({
  selector: 'app-rich-content-page',
  templateUrl: './rich-content-page.component.html',
  styleUrls: ['./rich-content-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RichContentPageComponent {
  richContentPageDataPromise = this.richContentPageService.getRichContentPageData();
  themeObs = this.themeService.observeTheme();

  constructor(private readonly richContentPageService: RichContentPageService,
              private readonly themeService: ThemeService) {
  }

}
