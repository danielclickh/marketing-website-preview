import {LinkTarget, StrapiButton, StrapiEntry, StrapiImage} from "../common/protocol/strapi.protocol";

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
  icon?: StrapiImage;
}

export interface HeaderData extends StrapiEntry {
  ctaButton: StrapiButton;
  menuItems: Array<HeaderTopNavItem>;
  logoIcon: StrapiImage;
}

export interface RegularNavItem {
  id: number;
  name: string;
  href: string;
  target: LinkTarget;
}
