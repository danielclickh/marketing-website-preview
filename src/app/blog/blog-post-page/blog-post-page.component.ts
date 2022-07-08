import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BlogPost} from "../blog.protocol";
import {BlogService} from "../blog.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import copy from 'copy-to-clipboard';

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
              private readonly snackBar: MatSnackBar) {
  }

  async ngOnInit() {
    const allBlogPosts = await this.blogService.getBlogPosts();
    const blogPostId = parseInt(this.activatedRoute.snapshot.params['blogPostId']);
    this.allBlogPosts = allBlogPosts;
    this.blogPost = allBlogPosts.find((e) => e.id === blogPostId);
    this.cd.detectChanges();
  }

  copyToClipboard(): void {
    this.snackBar.open('Copied to clipboard', 'Dismiss', {duration: 5000});
    copy(window.location.href);
  }

  getTwitterLink() {
    const twitterBaseUrl = "https://twitter.com/intent/tweet"
    const escapedUrl = encodeURIComponent(window.location.href);
    return `${twitterBaseUrl}?text=${escapedUrl}`;
  }

  getFacebookLink() {
    const facebookBaseUrl = "https://www.facebook.com/sharer/sharer.php"
    const escapedUrl = encodeURIComponent(window.location.href);
    return `${facebookBaseUrl}?u=${escapedUrl}`;
  }

  getLinkedinLink() {
    const linkedinBaseUrl = "https://www.linkedin.com/sharing/share-offsite/"
    const escapedUrl = encodeURIComponent(window.location.href);
    return `${linkedinBaseUrl}?url=${escapedUrl}`;
  }

  getOtherBlogPosts(): Array<BlogPost> {
    return this.allBlogPosts!
      .filter((post) => post.id !== this.blogPost!.id)
      .slice(0, 3)
  }
}
