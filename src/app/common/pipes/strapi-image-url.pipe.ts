import {Pipe, PipeTransform} from '@angular/core';
import {environment} from "../../../environments/environment";

@Pipe({
  name: 'strapiImageUrl'
})
export class StrapiImageUrlPipe implements PipeTransform {
  transform(relativeUrl: string): string {
    return environment.strapiBaseUrl + relativeUrl;
  }

}
