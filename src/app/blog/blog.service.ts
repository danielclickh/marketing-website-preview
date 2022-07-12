import {Injectable} from '@angular/core';
import {StrapiService} from "../common/services/strapi.service";
import {BlogData, BlogPost} from "./blog.protocol";
import {convertMarkdown} from "../common/utils/MarkdownUtils";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private readonly strapiService: StrapiService,
              private domSanitizer: DomSanitizer) {
  }

  getBlogPostUrl(blogPost: BlogPost): string {
    return `/blog/${blogPost.slug ? blogPost.slug : blogPost.id}`;
  }

  async getBlogData(): Promise<BlogData> {
    const blogRes: any = await this.strapiService.getStrapi().find('blog', {
      populate: [
        'hero',
        'newsletterForm',
        'seo',
        'seo.image',
      ]
    });

    const attributes = {...blogRes.data.attributes};
    this.strapiService.setSeoTags(attributes.seo);
    return attributes;
  }

  async getBlogPosts(): Promise<Array<BlogPost>> {
    const blogPostsRes: any = await this.strapiService.getStrapi().find('blog-posts', {
      sort: [
        'date:DESC',
        'publishedAt:DESC'
      ],
      populate: [
        'author',
        'author.avatarPng',
        'thumbnailPng'
      ]
    });

    const blogPostsData = blogPostsRes.data;
    return blogPostsData.map((blogWithAttributes: any) => {
      const blogPost = blogWithAttributes.attributes;
      return {
        id: blogWithAttributes.id,
        publishedAt: blogPost.publishedAt,
        ...blogPost,
        content: convertMarkdown(blogPost.content),
        author: {...blogPost.author, avatarPngUrl: this.strapiService.extractImageUrl(blogPost.author.avatarPng)},
        thumbnailPngUrl: this.strapiService.extractImageUrl(blogPost.thumbnailPng),
      };
    });
  }
}
