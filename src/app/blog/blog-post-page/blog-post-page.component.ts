import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BlogPost} from '../blog.protocol';
import {BlogService} from '../blog.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import copy from 'copy-to-clipboard';
import {isPlatformServer} from '@angular/common';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-blog-post-page',
  templateUrl: './blog-post-page.component.html',
  styleUrls: ['./blog-post-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogPostPageComponent implements OnInit {
  blogPost?: BlogPost;
  allBlogPosts?: Array<BlogPost>;

  constructor(private readonly blogService: BlogService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly cd: ChangeDetectorRef,
              private readonly snackBar: MatSnackBar,
              private readonly router: Router,
              @Inject(PLATFORM_ID) private platformId: string) {
  }

  async ngOnInit() {
    const blogPostIdOrSlug = this.activatedRoute.snapshot.params['blogPostIdOrSlug'];
    if (blogPostIdOrSlug === 'en') {
      await this.router.navigateByUrl('/blog');
      return;
    }
    const slug = isNaN(blogPostIdOrSlug) ? blogPostIdOrSlug : undefined;
    const id = !isNaN(blogPostIdOrSlug) ? parseInt(blogPostIdOrSlug) : undefined;
    this.blogPost = await this.blogService.getBlogPost(slug, id);
    if (!this.blogPost) {
      await this.router.navigateByUrl('/blog');
      return;
    }
    this.allBlogPosts = await this.blogService.getBlogPosts();
    this.cd.detectChanges();
  }

  copyToClipboard(): void {
    this.snackBar.open('Copied to clipboard', 'Dismiss', {duration: 5000});
    copy(this.pageUrl);
  }

  getTwitterLink() {
    if (isPlatformServer(this.platformId)) return '/';
    const twitterBaseUrl = 'https://twitter.com/intent/tweet';
    const escapedUrl = encodeURIComponent(this.pageUrl);
    return `${twitterBaseUrl}?text=${escapedUrl}`;
  }

  getFacebookLink() {
    if (isPlatformServer(this.platformId)) return '/';
    const facebookBaseUrl = 'https://www.facebook.com/sharer/sharer.php';
    const escapedUrl = encodeURIComponent(this.pageUrl);
    return `${facebookBaseUrl}?u=${escapedUrl}`;
  }

  getLinkedinLink() {
    if (isPlatformServer(this.platformId)) return '/';
    const linkedinBaseUrl = 'https://www.linkedin.com/sharing/share-offsite/';
    const escapedUrl = encodeURIComponent(this.pageUrl);
    return `${linkedinBaseUrl}?url=${escapedUrl}`;
  }

  getOtherBlogPosts(): Array<BlogPost> {
    return this.allBlogPosts!
      .filter((post) => post.id !== this.blogPost!.id)
      .slice(0, 3);
  }

  getBlogPostUrl(blogPost: BlogPost) {
    return this.blogService.getBlogPostUrl(blogPost);
  }

  private get pageUrl(): string {
    return environment.siteUrl + this.router.url;
  }
}
