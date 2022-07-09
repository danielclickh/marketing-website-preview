import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class FontsResolverService implements Resolve<void> {

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
  }

  async resolve(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      // Load the fonts. Note: The 10px is just a dummy because there is no way to not provide the size.
      await Promise.all([
        document.fonts.load('10px "Inter"'),
        document.fonts.load('10px "Material Icons"'),
        document.fonts.load('10px "Hind Siliguri"')
      ]);
    }
  }
}
