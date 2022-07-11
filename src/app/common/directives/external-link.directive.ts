import {Directive, HostBinding, Inject, Input, OnChanges, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Directive({
  selector: 'a[href]'
})
export class ExternalLinkDirective implements OnChanges {
  @HostBinding('attr.rel') relAttr?: string;
  @HostBinding('attr.href') hrefAttr?: string;
  @Input() href?: string;

  constructor(@Inject(PLATFORM_ID) private platformId: string) {
  }

  ngOnChanges() {
    this.hrefAttr = this.href;

    if (this.isLinkExternal()) {
      this.relAttr = 'external nofollow noopener';
    }
  }

  private isLinkExternal() {
    return isPlatformBrowser(this.platformId) && this.href && !this.href.startsWith('/');
  }
}
