import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CookiesConsentService} from "./cookies-consent.service";
import {trackById} from '../common/utils/AngularUtils';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-cookies-consent',
  templateUrl: './cookies-consent.component.html',
  styleUrls: ['./cookies-consent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CookiesConsentComponent {
  readonly trackById = trackById;

  constructor(private readonly cookiesService: CookiesConsentService,
              public dialogRef: MatDialogRef<CookiesConsentComponent>,) {
  }

  choseConsent(consent: boolean): void {
    this.cookiesService.setUserConsent(consent);
    this.dialogRef.close();
  }
}
