import {Pipe, PipeTransform} from '@angular/core';
import {environment} from "../../../environments/environment";
import {StrapiImage} from "../protocol/strapi.protocol";

@Pipe({
  name: 'strapiImageUrl'
})
export class StrapiImageUrlPipe implements PipeTransform {
  transform(image: StrapiImage | string, size?: 'small' | 'medium' | 'large' | 'thumbnail', ...otherArgs: unknown[]): string {
    if (typeof image === 'string') {
      return environment.strapiBaseUrl + image;
    }

    if (size && image.formats?.[size]) {
      const formattedImage = image.formats?.[size];
      return environment.strapiBaseUrl + formattedImage.url;
    }

    return environment.strapiBaseUrl + image.url;
  }
}
