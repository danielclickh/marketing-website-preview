import {Directive, ElementRef, Input, OnChanges} from '@angular/core';
import {environment} from "../../../environments/environment";
import {StrapiImage} from "../protocol/strapi.protocol";

@Directive({
  selector: '[strapiCssImage]'
})
export class StrapiCssImageDirective implements OnChanges {
  @Input()
  strapiCssImage!: StrapiImage | string;

  @Input()
  size?: 'small' | 'medium' | 'large' | 'thumbnail';

  constructor(private readonly elRef: ElementRef) {
  }


  ngOnChanges() {
    let imageOrUrl = this.strapiCssImage;
    if (typeof imageOrUrl === 'string') {
      if (!imageOrUrl.startsWith(environment.strapiBaseUrl)) {
        imageOrUrl = environment.strapiBaseUrl + imageOrUrl;
      }
    } else {
      const size = this.size;
      if (size && imageOrUrl.formats?.[size]) {
        const formattedImage = imageOrUrl.formats?.[size];
        imageOrUrl = environment.strapiBaseUrl + formattedImage.url;
      } else {
        imageOrUrl = environment.strapiBaseUrl + imageOrUrl.url;
      }
    }
    this.elRef.nativeElement.style.backgroundImage = `url('${imageOrUrl}')`;
  }
}
