import {Directive, ElementRef, Input, OnChanges} from '@angular/core';
import {environment} from "../../../environments/environment";

@Directive({
  selector: '[strapiCssImage]'
})
export class StrapiCssImageDirective implements OnChanges {
  @Input()
  strapiCssImage!: string;

  constructor(private readonly elRef: ElementRef) {
  }


  ngOnChanges() {
    console.log('Changes!!');
    const url = environment.strapiBaseUrl + this.strapiCssImage;
    this.elRef.nativeElement.style.backgroundImage = `url('${url}')`;
  }
}
