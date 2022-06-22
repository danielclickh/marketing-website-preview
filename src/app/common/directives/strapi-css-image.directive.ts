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

  ngAfterViewInit() {
    this.elRef.nativeElement.style.backgroundImage = `url('${environment.strapiBaseUrl}${this.strapiCssImage}')`;
  }

}
