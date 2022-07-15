import {LinkTarget, StrapiLink} from "../common/protocol/strapi.protocol";

export interface FooterBottomLink extends StrapiLink {
  text: string;
}

export interface FooterData {
  licensingText: string;
  copyright: string;
  logoSvgId: string;
  topLevelFooterMenu: Array<TopLevelFooterMenu>;
  newsletterForm: FooterNewsletterForm;
  socialLinks: FooterSocialLinks;
  bottomLinks: Array<FooterBottomLink>;
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
