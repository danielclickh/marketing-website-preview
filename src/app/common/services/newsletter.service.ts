import {Injectable} from '@angular/core';
import {isEmail} from "../utils/ValidationUtils";
import {WorkatoService} from "./workato.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StrapiService} from "./strapi.service";
import {NewsletterFormData} from "../protocol/common.protocol";

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor(private readonly strapiService: StrapiService,
              private readonly workatoService: WorkatoService,
              private readonly snackBar: MatSnackBar) {
  }

  async getNewsletterFormData(): Promise<NewsletterFormData> {
    const newsletterFormData: any = await this.strapiService.getStrapi().find('newsletter-form', {
      populate: '*'
    });
    return {...newsletterFormData.data.attributes}
  }

  async submitNewsletterForm(email?: string) {
    if (!isEmail(email)) {
      this.snackBar.open('Please enter a valid email address', 'Dismiss', {duration: 5000});
      return;
    }
    await this.workatoService.submitNewsletterForm(email);
    this.snackBar.open('Thanks for registering to our newsletter!', 'Dismiss', {duration: 5000});
  }
}
