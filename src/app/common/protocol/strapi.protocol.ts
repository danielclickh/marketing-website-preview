export type LinkTarget = '_self' | '_blank';

export interface StrapiEntry {
  id: number;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
}

export interface StrapiImage {
  hash: string;
  url: string;
}

export interface StrapiLink {
  href: string;
  target: LinkTarget
}

export interface StrapiButton extends StrapiLink {
  id: number;
  text: string;
}

export interface StrapiIconButton extends StrapiLink {
  id: number;
  darkIconPng: StrapiImage;
  lightIconPng: StrapiImage;
  text?: string;
}

