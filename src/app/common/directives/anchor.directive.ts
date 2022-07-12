import {Directive, ElementRef, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformServer} from "@angular/common";

@Directive({
  selector: '[anchor]'
})
export class AnchorDirective implements OnInit {

  @Input() id?: string;

  constructor(@Inject(PLATFORM_ID) private platformId: object,
              private elementRef: ElementRef) {

  }

  ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      return;
    }
    const hash = window.location.hash;
    if (!hash) {
      return;
    }
    const anchorId = hash.replace('#', '');
    if (this.id === anchorId) {
      setTimeout(() => {
        const el = this.elementRef.nativeElement;
        const y = el.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({top: y, behavior: 'smooth'});
      }, 100);
    }
  }

}
