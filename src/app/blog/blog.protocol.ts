export interface BlogPostAuthor {
  name: string;
  avatarPngUrl: string;
}

export interface BlogPost {
  id: number;
  category: string;
  title: string;
  shortDescription: string;
  content: string;
  author: BlogPostAuthor;
  thumbnailPngUrl: string;
  publishedAt: string;
  slug?: string;
}

export interface BlogHero {
  title: string;
  description: string;
}

export interface BlogData {
  hero: BlogHero;
}
