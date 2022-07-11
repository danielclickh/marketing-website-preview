import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './header/header.component';
import {HomepageComponent} from './homepage/homepage.component';
import {HomepageLayoutComponent} from './homepage-layout/homepage-layout.component';
import {FooterComponent} from './footer/footer.component';
import {StrapiCssImageDirective} from './common/directives/strapi-css-image.directive';
import {ThemeService} from "./common/services/theme.service";
import {MatIconModule} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {GettingStartedComponent} from './common/sections/getting-started/getting-started.component';
import {MatTabsModule} from "@angular/material/tabs";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {StrapiImageUrlPipe} from './common/pipes/strapi-image-url.pipe';
import {FeatureListComponent} from './common/sections/feature-list/feature-list.component';
import {
  ScreenshotAndBulletsListComponent
} from './common/sections/screenshot-and-bullets-list/screenshot-and-bullets-list.component';
import {CloudComponent} from './cloud/cloud.component';
import {ContactFormComponent} from './common/sections/contact-form/contact-form.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {GrowingCommunityComponent} from './common/sections/growing-community/growing-community.component';
import {ClickhouseComponent} from './clickhouse/clickhouse.component';
import {CareersComponent} from './careers/careers.component';
import {OurStoryComponent} from './our-story/our-story.component';
import {CustomerStoriesComponent} from "./customer-stories/customer-stories.component";
import {
  CustomerStoriesTestimonialComponent
} from './customer-stories/customer-stories-testimonial/customer-stories-testimonial.component';
import {NewsAndEventsComponent} from './news-and-events/news-and-events.component';
import {RecentEventsComponent} from './news-and-events/recent-events/recent-events.component';
import {NewsItemComponent} from './news-and-events/news-item/news-item.component';
import {EventPageComponent} from './event-page/event-page.component';
import {BlogComponent} from './blog/blog.component';
import {BlogPostPageComponent} from './blog/blog-post-page/blog-post-page.component';
import {NewsletterFormComponent} from './common/sections/newsletter-form/newsletter-form.component';
import {UtmService} from "./common/services/utm.service";
import {SegmentService} from "./common/services/segment.service";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    HomepageLayoutComponent,
    FooterComponent,
    StrapiCssImageDirective,
    GettingStartedComponent,
    StrapiImageUrlPipe,
    FeatureListComponent,
    ScreenshotAndBulletsListComponent,
    CloudComponent,
    ContactFormComponent,
    ContactUsComponent,
    GrowingCommunityComponent,
    ClickhouseComponent,
    CareersComponent,
    OurStoryComponent,
    CustomerStoriesComponent,
    CustomerStoriesTestimonialComponent,
    NewsAndEventsComponent,
    RecentEventsComponent,
    NewsItemComponent,
    EventPageComponent,
    BlogComponent,
    BlogPostPageComponent,
    NewsletterFormComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private readonly segmentService: SegmentService,
              private readonly utmService: UtmService,
              private readonly themeService: ThemeService) {
    themeService.initialize();
  }
}
