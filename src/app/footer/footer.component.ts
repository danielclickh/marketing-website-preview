import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {FooterService} from "./footer.service";
import {WorkatoService} from "../common/services/workato.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NewsletterService} from "../common/services/newsletter.service";
import {SegmentService} from "../common/services/segment.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  footerDataPromise = this.footerService.getFooterData();
  newsletterEmail?: string;

  constructor(private readonly newsletterService: NewsletterService,
              private readonly footerService: FooterService,
              private readonly workatoService: WorkatoService,
              private readonly snackBar: MatSnackBar,
              private readonly cd: ChangeDetectorRef,
              readonly segmentService: SegmentService) {
  }

  async submitNewsletterForm() {
    await this.newsletterService.submitNewsletterForm(this.newsletterEmail);
    this.newsletterEmail = undefined;
    this.cd.detectChanges();
  }
}
