import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CookiesConsentService} from "./cookies-consent.service";
import {CpTheme, ThemeService} from "../common/services/theme.service";
import {trackById} from '../common/utils/AngularUtils';
import {Observable} from "rxjs";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-cookies-consent',
  templateUrl: './cookies-consent.component.html',
  styleUrls: ['./cookies-consent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CookiesConsentComponent {
  readonly trackById = trackById;
  themeObs: Observable<CpTheme>;

  constructor(private readonly cookiesService: CookiesConsentService,
              private readonly themeService: ThemeService,
              public dialogRef: MatDialogRef<CookiesConsentComponent>,) {
    this.themeObs = themeService.observeTheme();
  }

  choseConsnet(consent: boolean): void {
    this.cookiesService.setUserConsent(consent);
    this.dialogRef.close();
  }
}
