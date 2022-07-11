import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BlogPost} from "../blog.protocol";
import {BlogService} from "../blog.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import copy from 'copy-to-clipboard';
import {isPlatformServer} from "@angular/common";

@Component({
  selector: 'app-blog-post-page',
  templateUrl: './blog-post-page.component.html',
  styleUrls: ['./blog-post-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogPostPageComponent implements OnInit {
  blogPost?: BlogPost
  allBlogPosts?: Array<BlogPost>;

  constructor(private readonly blogService: BlogService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly cd: ChangeDetectorRef,
              private readonly snackBar: MatSnackBar,
              @Inject(PLATFORM_ID) private platformId: string) {
  }

  async ngOnInit() {
    const allBlogPosts = await this.blogService.getBlogPosts();
    const blogPostIdOrSlug = this.activatedRoute.snapshot.params['blogPostIdOrSlug'];
    this.allBlogPosts = allBlogPosts;
    this.blogPost = allBlogPosts.find((e) => e.slug === blogPostIdOrSlug || (!isNaN(blogPostIdOrSlug) && e.id === parseInt(blogPostIdOrSlug)));
    this.cd.detectChanges();
  }

  copyToClipboard(): void {
    this.snackBar.open('Copied to clipboard', 'Dismiss', {duration: 5000});
    copy(window.location.href);
  }

  getTwitterLink() {
    if (isPlatformServer(this.platformId)) return '/';
    const twitterBaseUrl = "https://twitter.com/intent/tweet"
    const escapedUrl = encodeURIComponent(window.location.href);
    return `${twitterBaseUrl}?text=${escapedUrl}`;
  }

  getFacebookLink() {
    if (isPlatformServer(this.platformId)) return '/';
    const facebookBaseUrl = "https://www.facebook.com/sharer/sharer.php"
    const escapedUrl = encodeURIComponent(window.location.href);
    return `${facebookBaseUrl}?u=${escapedUrl}`;
  }

  getLinkedinLink() {
    if (isPlatformServer(this.platformId)) return '/';
    const linkedinBaseUrl = "https://www.linkedin.com/sharing/share-offsite/"
    const escapedUrl = encodeURIComponent(window.location.href);
    return `${linkedinBaseUrl}?url=${escapedUrl}`;
  }

  getOtherBlogPosts(): Array<BlogPost> {
    return this.allBlogPosts!
      .filter((post) => post.id !== this.blogPost!.id)
      .slice(0, 3)
  }

  getBlogPostUrl(blogPost: BlogPost) {
    return this.blogService.getBlogPostUrl(blogPost);
  }
}
