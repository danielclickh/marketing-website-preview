import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FontsResolverService} from "./common/services/fonts-resolver.service";
import {HomepageLayoutComponent} from "./homepage-layout/homepage-layout.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {CloudComponent} from "./cloud/cloud.component";
import {ContactUsComponent} from "./contact-us/contact-us.component";
import {ClickhouseComponent} from "./clickhouse/clickhouse.component";
import {CareersComponent} from "./careers/careers.component";
import {OurStoryComponent} from "./our-story/our-story.component";
import {CustomerStoriesComponent} from "./customer-stories/customer-stories.component";
import {NewsAndEventsComponent} from "./news-and-events/news-and-events.component";
import {EventPageComponent} from "./event-page/event-page.component";
import {BlogComponent} from "./blog/blog.component";
import {BlogPostPageComponent} from "./blog/blog-post-page/blog-post-page.component";
import {RedirectComponent} from "./redirect/redirect.component";


const routes: Routes = [
  {
    path: '',
    resolve: {
      'fonts': FontsResolverService,
    },
    children: [
      {
        path: '',
        component: HomepageLayoutComponent,
        children: [
          {path: '', component: HomepageComponent},
          {path: 'cloud', component: CloudComponent},
          {path: 'clickhouse', component: ClickhouseComponent},
          {path: 'company/contact', component: ContactUsComponent},
          {path: 'company/careers', component: CareersComponent},
          {path: 'company/our-story', component: OurStoryComponent},
          {path: 'company/news-events', component: NewsAndEventsComponent},
          {path: 'company/event/:eventId', component: EventPageComponent},
          {path: 'customer-stories', component: CustomerStoriesComponent},
          {path: 'blog', component: BlogComponent},
          {path: 'blog/:blogPostId', component: BlogPostPageComponent},
        ]
      }
    ]
  },
  {path: '**', component: RedirectComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
