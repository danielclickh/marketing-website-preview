// import {ContactForm, SeoMetadata} from "../common/protocol/common.protocol";
import {StrapiImage} from "../common/protocol/strapi.protocol";

export interface ServiceUnavailableCountryCard {
  title: string;
  iconSvg: StrapiImage;
  description: string;
  contactForm: {
    emailLabel: string;
    tosCheckboxRichText: string;
    success: string;
  }
  ctaButton: {
    text: string;
  }
}


export interface ServiceUnavailableCountryData {
  card: ServiceUnavailableCountryCard;
  install_oss: {
    title: string;
    platforms: Array<ServiceUnavailableCountryPlatform>;
    alternatives: string;
  }
}

export interface ServiceUnavailableCountryPlatform {
  name: string;
  instructions: string;
}
