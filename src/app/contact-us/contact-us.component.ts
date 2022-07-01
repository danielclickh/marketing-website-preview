import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ThemeService} from "../common/services/theme.service";
import {ContactUsService} from "./contact-us.service";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactUsComponent {
  contactUsDataPromise = this.contactUsService.getContactUsData();
  themeObs = this.themeService.observeTheme();

  constructor(private readonly contactUsService: ContactUsService,
              private readonly themeService: ThemeService) {
  }

}
