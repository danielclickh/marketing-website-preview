import {Injectable} from '@angular/core';
import Strapi from "strapi-sdk-js";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StrapiService {
  private readonly strapi: Strapi;

  constructor() {
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
}
