import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {firstValueFrom} from "rxjs";

type WorkatoFormType = 'newsletter';
type WorkatoRequest = WorkatoNewsletterRequest;

interface BaseWorkatoRequest {
  utm_campaign?: string,
  utm_medium?: string,
  utm_source?: string,
  utm_campaign_c?: string,
  utm_medium_c?: string,
  utm_source_c?: string,
}

interface WorkatoNewsletterRequest extends BaseWorkatoRequest {
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class WorkatoService {
  constructor(private readonly http: HttpClient) {
  }

  async submitNewsletterForm(email: string): Promise<void> {
    const request: WorkatoNewsletterRequest = {email};
    await this.submitWorkatoForm('newsletter', request);
  }

  private async submitWorkatoForm(formType: WorkatoFormType, request: WorkatoRequest) {
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
