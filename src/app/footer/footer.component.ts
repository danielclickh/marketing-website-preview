import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ThemeService} from "../common/services/theme.service";
import {FooterService} from "./footer.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  footerDataPromise = this.footerService.getFooterData();

  constructor(private readonly footerService: FooterService,
              private readonly themeService: ThemeService) {
  }
}
