import {Injectable} from '@angular/core';
import {StrapiFindParams, StrapiService} from "../common/services/strapi.service";
import {BlogData, BlogPost} from "./blog.protocol";
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

    const result = this.strapiService.convertStrapiObject<BlogData>(blogRes.data);
    this.strapiService.setSeoTags(result.seo);
    return result;
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
        'thumbnailPng',
      ],

      fields: [
        'category',
        'title',
        'shortDescription',
        'createdAt',
        'updatedAt',
        'publishedAt',
        'slug',
        'date',
      ]

    });
    return this.strapiService.convertStrapiObject(blogPostsRes.data);
  }

  async getBlogPost(slug?: string, id?: number): Promise<BlogPost> {
    const params: StrapiFindParams = {
      populate: [
        'author',
        'author.avatarPng',
        'thumbnailPng',
      ]
    };
    if (slug) {
      params.filters = [{field: 'slug', operator: '$eq', value: slug}];
    } else if (id !== undefined) {
      params.filters = [{field: 'id', operator: '$eq', value: id}];
    }
    const blogPostsRes: any = await this.strapiService.getStrapi().find('blog-posts', params);
    return this.strapiService.convertStrapiObject(blogPostsRes.data[0]);
  }
}
