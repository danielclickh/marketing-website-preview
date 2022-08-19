import {SeoMetadata} from "../common/protocol/common.protocol";
import {StrapiImage} from "../common/protocol/strapi.protocol";

export interface BlogPostAuthor {
  name: string;
  avatarPng: StrapiImage;
}

export interface BlogPost {
  id: number;
  category: string;
  title: string;
  shortDescription: string;
  content: string;
  author: BlogPostAuthor;
  thumbnailPng: StrapiImage;
  publishedAt: string;
  slug?: string;
  date?: string;
  keywords?: string;
}

export interface BlogHero {
  title: string;
  description: string;
}

export interface BlogData {
  hero: BlogHero;
  seo: SeoMetadata;
}
