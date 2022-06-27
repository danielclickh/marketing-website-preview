import {LinkTarget} from "../common/protocol/strapi.protocol";

export interface FooterData {
  copyrightText: string;
  logoSvgId: string;
  topLevelFooterMenu: Array<TopLevelFooterMenu>;
  newsletterForm: FooterNewsletterForm;
  socialLinks: FooterSocialLinks;
}

export interface TopLevelFooterMenu {
  id: number;
  title: string;
  items: Array<SubLevelFooterMenu>
}

export interface SubLevelFooterMenu {
  id: number;
  href: string;
  target: LinkTarget;
  name: string;
}

export interface FooterNewsletterForm {
  id: number;
  buttonLabel: string;
  description: string;
  inputLabel: string;
  title: string;
}

export interface FooterSocialLinks {
  id: number;
  title: string;
  items: Array<FooterSocialLink>;
}

export interface FooterSocialLink {
  href: string;
  target: string;
  iconSvgUrl: string;
}
