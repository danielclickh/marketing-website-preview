import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CustomerStoriesTestimonial} from "../customer-stories.protocol";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'customer-stories-testimonial',
  templateUrl: './customer-stories-testimonial.component.html',
  styleUrls: ['./customer-stories-testimonial.component.scss'],
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
export class CustomerStoriesTestimonialComponent {
  @Input()
  testimonial!: CustomerStoriesTestimonial;

  constructor() {
  }

  getPositiveRatingPercentage(rating: number) {
    return Math.floor(rating / 5 * 100);
  }
}
