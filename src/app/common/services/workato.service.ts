import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {firstValueFrom} from "rxjs";
import {UtmService} from "./utm.service";

type WorkatoFormType = 'newsletter' | 'websiteContact' | 'eventRegistration' | 'recordedGatedContent';
type WorkatoRequest = WorkatoNewsletterRequest;

interface BaseWorkatoRequest {
  url?: string;
  utm_campaign?: string,
  utm_medium?: string,
  utm_source?: string,
}

interface WorkatoNewsletterRequest extends BaseWorkatoRequest {
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
              private readonly utmService: UtmService) {
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

  private async submitWorkatoForm(formType: WorkatoFormType, request: WorkatoRequest) {
    const utmParams = this.utmService.getUtmParams();
    request = {...request, ...utmParams};
    request.url = window.location.href;
    await firstValueFrom(this.http.post(
      `${environment.workatoApiBaseUrl}/${formType}`,
      request,
      {
        headers: {
          'API-TOKEN': `${environment.workatoToken}`
        }
      }
    ));
  }
}
