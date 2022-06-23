export type LinkTarget = '_self' | '_blank';

export interface StrapiEntry {
  id: number;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
}

export interface StrapiButton {
  id: number;
  href: string;
  target: LinkTarget
  text: string;
}
