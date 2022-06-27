import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {FooterService} from "./footer.service";
import {WorkatoService} from "../common/services/workato.service";
import {isEmail} from "../common/utils/ValidationUtils";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  footerDataPromise = this.footerService.getFooterData();
  newsletterEmail?: string;

  constructor(private readonly footerService: FooterService,
              private readonly workatoService: WorkatoService,
              private readonly snackBar: MatSnackBar,
              private readonly cd: ChangeDetectorRef) {
  }

  async submitNewsletterForm() {
    if (!isEmail(this.newsletterEmail)) {
      this.snackBar.open('Please enter a valid email address', 'Dismiss', {duration: 5000});
      return;
    }
    await this.workatoService.submitNewsletterForm(this.newsletterEmail);
    this.newsletterEmail = undefined;
    this.snackBar.open('Thanks for registering to our newsletter!', 'Dismiss', {duration: 5000});
    this.cd.detectChanges();
  }
}
