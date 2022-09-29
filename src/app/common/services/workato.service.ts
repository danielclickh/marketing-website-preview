import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {firstValueFrom} from "rxjs";
import {UtmService} from "./utm.service";
import {SegmentService} from "./segment.service";
import {isPlatformServer} from "@angular/common";

type WorkatoFormType = 'newsletter' | 'websiteContact' | 'eventRegistration' | 'recordedGatedContent' | 'serviceUnavailableCountry'
type WorkatoRequest =
  WorkatoContactRequest
  | WorkatoNewsletterRequest
  | WorkatoEventRegisterRequest
  | WorkatoRecordedGatedContentRequest
  | WorkatoServiceUnavailableCountryRequest;

export interface WorkatoResponse {
  cloudId?: string;
}

interface BaseWorkatoRequest {
  url?: string;
  utm_campaign?: string;
  utm_medium?: string;
  utm_source?: string;
  firstName?: string;
  lastName?: string;
  mkto_trk?: string;
}

interface WorkatoNewsletterRequest extends BaseWorkatoRequest {
  email: string;
}

interface WorkatoServiceUnavailableCountryRequest extends BaseWorkatoRequest {
  email: string;
}

interface WorkatoContactRequest extends BaseWorkatoRequest {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  message?: string;
}

interface WorkatoEventRegisterRequest extends BaseWorkatoRequest {
  firstName: string;
  lastName: string;
  email: string;
}

interface WorkatoRecordedGatedContentRequest extends BaseWorkatoRequest {
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class WorkatoService {
  constructor(private readonly http: HttpClient,
              private readonly utmService: UtmService,
              private readonly segmentService: SegmentService,
              @Inject(PLATFORM_ID) private platformId: object) {

  }

  async submitNewsletterForm(email: string): Promise<void> {
    const request: WorkatoNewsletterRequest = {email};
    await this.submitWorkatoForm('newsletter', request);
  }

  async websiteContact(firstName: string,
                       lastName: string,
                       email: string,
                       company?: string,
                       message?: string): Promise<void> {
    const request: WorkatoContactRequest = {firstName, lastName, email, company, message};
    await this.submitWorkatoForm('websiteContact', request);
  }

  async eventRegistration(firstName: string,
                          lastName: string,
                          email: string): Promise<void> {
    const request: WorkatoEventRegisterRequest = {firstName, lastName, email};
    await this.submitWorkatoForm('eventRegistration', request);
  }

  async recordedGatedContent(email: string): Promise<void> {
    const request: WorkatoRecordedGatedContentRequest = {email};
    await this.submitWorkatoForm('recordedGatedContent', request);
  }

  async submitServiceUnavailableCountryForm(email: string): Promise<void> {
    const request: WorkatoServiceUnavailableCountryRequest = {email};
    await this.submitWorkatoForm('serviceUnavailableCountry', request);
  }

  private async submitWorkatoForm(formType: WorkatoFormType, request: WorkatoRequest) {
    const utmParams = this.utmService.getUtmParams();
    request = {
      ...request,
      ...utmParams,
      mkto_trk: this.getMarketoCookie()
    };

    request.url = window.location.href;
    const workatoResp: WorkatoResponse = await firstValueFrom(this.http.post(
      `${environment.workatoApiBaseUrl}/${formType}`,
      request,
      {
        headers: {
          'API-TOKEN': `${environment.workatoToken}`
        }
      }
    ));

    if (request.email) {
      const email = request.email;
      const firstName = request.firstName;
      const lastName = request.lastName;
      const userId = workatoResp?.cloudId ? workatoResp.cloudId : email;
      this.segmentService.identify(email, firstName, lastName, userId);
      this.segmentService.trackEvent('Form Submitted', {
        email,
        userId,
        _mkt_trk: this.getMarketoCookie()
      });
    }
  }

  private getMarketoCookie(): string | undefined {
    if (isPlatformServer(this.platformId)) {
      return undefined;
    }

    try {
      const cookieMap = document.cookie
        .split('; ')
        .reduce((prev, item) => {
          const splitItem: string[] = item.split('=');
          prev[splitItem[0]] = splitItem[1];
          return prev
        }, {} as Record<string, string>);
      return cookieMap['_mkto_trk'];
    } catch (e) {
      console.error(e);
    }
    return undefined;
  }
}
