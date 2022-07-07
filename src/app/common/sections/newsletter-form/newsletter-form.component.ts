import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {NewsletterService} from "../../services/newsletter.service";

@Component({
  selector: 'newsletter-form',
  templateUrl: './newsletter-form.component.html',
  styleUrls: ['./newsletter-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsletterFormComponent {
  newsletterFormDataPromise = this.newsletterService.getNewsletterFormData();
  newsletterEmail?: string;

  constructor(private readonly newsletterService: NewsletterService,
              private readonly cd: ChangeDetectorRef) {
  }

  async submitNewsletterForm() {
    await this.newsletterService.submitNewsletterForm(this.newsletterEmail);
    this.newsletterEmail = undefined;
    this.cd.detectChanges();
  }


}
