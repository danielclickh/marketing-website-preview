import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BlogPost} from "../blog.protocol";
import {BlogService} from "../blog.service";

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
              private readonly cd: ChangeDetectorRef) {
  }

  async ngOnInit() {
    const allBlogPosts = await this.blogService.getBlogPosts();
    const blogPostId = parseInt(this.activatedRoute.snapshot.params['blogPostId']);
    this.allBlogPosts = allBlogPosts;
    this.blogPost = allBlogPosts.find((e) => e.id === blogPostId);
    this.cd.detectChanges();
  }
}
