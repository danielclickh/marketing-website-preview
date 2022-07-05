import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {ThemeService} from "../common/services/theme.service";
import {CustomerStoriesService} from "./customer-stories.service";
import {CustomerStoriesTestimonial} from "./customer-stories.protocol";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-customer-stories',
  templateUrl: './customer-stories.component.html',
  styleUrls: ['./customer-stories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({opacity: 0}),
          animate('500ms', style({opacity: 1}))
        ])
      ]
    )
  ],
})
export class CustomerStoriesComponent {
  customerStoriesDataPromise = this.customerStoriesService.getCustomerStoriesData();
  themeObs = this.themeService.observeTheme();
  paginationEnabled = false;
  allTestimonials: Array<CustomerStoriesTestimonial> | undefined = undefined;
  currentPage = 0;
  numberOfPages = 0;

  constructor(private readonly customerStoriesService: CustomerStoriesService,
              private readonly themeService: ThemeService,
              private readonly cd: ChangeDetectorRef) {
    this.initializeTestimonialPagination().then();
  }

  nextPage() {
    this.currentPage = (this.currentPage + 1) % this.numberOfPages;
  }

  previousPage() {
    this.currentPage = (this.currentPage + this.numberOfPages - 1) % this.numberOfPages;
  }

  getCurrentTestimonialsPage(): Array<CustomerStoriesTestimonial> {
    if (!this.allTestimonials) {
      return [];
    }
    const startIndex = this.currentPage * 3;
    return this.allTestimonials.slice(startIndex, startIndex + 3);
  }

  getPositiveRatingPercentage(rating: number) {
    return Math.floor(rating / 5 * 100);
  }

  private async initializeTestimonialPagination() {
    const customerStoriesData = await this.customerStoriesDataPromise;
    const testimonials = customerStoriesData.hero.testimonials;
    this.allTestimonials = testimonials;
    this.paginationEnabled = testimonials.length > 3;
    this.numberOfPages = Math.ceil(testimonials.length / 3);
    this.cd.detectChanges();
  }


}
