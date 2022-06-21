import {LinkTarget, StrapiEntry} from "../common/protocol/strapi.protocol";

export interface HeaderCtaButton {
  id: number;
  href: string;
  target: LinkTarget
  text: string;
}

export interface HeaderTopNavItem {
  id: number;
  name: string;
  href?: string;
  target: LinkTarget;
  menuItems: Array<HeaderTopNavSubItem>
}

export interface HeaderTopNavSubItem {
  id: number;
  description?: string;
  href: string;
  target: LinkTarget;
  name: string;
  iconUrl?: string;
}

export interface HeaderData extends StrapiEntry {
  ctaButton: HeaderCtaButton;
  menuItems: Array<HeaderTopNavItem>;
  logoIconUrl: string;
}
