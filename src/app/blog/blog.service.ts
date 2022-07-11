import {Injectable} from '@angular/core';
import {StrapiService} from "../common/services/strapi.service";
import {BlogData, BlogPost} from "./blog.protocol";
import {marked} from "marked";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private readonly strapiService: StrapiService) {
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
        content: marked.parse(blogPost.content, {baseUrl: environment.strapiBaseUrl}),
        author: {...blogPost.author, avatarPngUrl: this.strapiService.extractImageUrl(blogPost.author.avatarPng)},
        thumbnailPngUrl: this.strapiService.extractImageUrl(blogPost.thumbnailPng),
      };
    });
  }
}
