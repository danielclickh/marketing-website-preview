import {Injectable} from '@angular/core';
import Strapi from "strapi-sdk-js";
import {environment} from "../../../environments/environment";
import {ThemeService} from "./theme.service";

@Injectable({
  providedIn: 'root'
})
export class StrapiService {
  private readonly strapi: Strapi;

  constructor(private readonly themeService: ThemeService) {
    this.strapi = new Strapi({
      url: environment.strapiBaseUrl,
      prefix: '/api',
      store: {
        key: "strapi_jwt",
        useLocalStorage: false,
        cookieOptions: {path: "/"},
      },
      axiosOptions: {},
    })
  }

  getStrapi() {
    return this.strapi;
  }

  registerSvgIcon(iconObject?: { data?: { attributes: { hash: string, url: string } } }): string | undefined {
    const iconObjectAttrs = iconObject?.data?.attributes;
    if (!iconObjectAttrs) {
      return undefined;
    }
    const url = environment.strapiBaseUrl + iconObjectAttrs.url;
    this.themeService.registerIcon(iconObjectAttrs.hash, url);
    return iconObjectAttrs.hash + '';
  }
}
