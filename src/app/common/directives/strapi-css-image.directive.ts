import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';
import {environment} from "../../../environments/environment";

@Directive({
  selector: '[strapiCssImage]'
})
export class StrapiCssImageDirective implements AfterViewInit {
  @Input()
  strapiCssImage!: string;

  constructor(private readonly elRef: ElementRef) {
  }

  async ngAfterViewInit() {
    const url = environment.strapiBaseUrl + this.strapiCssImage;
    this.elRef.nativeElement.style.backgroundImage = `url('${url}')`;
  }
}
