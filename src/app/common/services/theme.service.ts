import {Injectable} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

export interface Icon {
  name: string;
  svgRelativePath: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private iconList: Icon[] = [];

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {

  }

  initializeIcons() {
    for (const icon of this.iconList) {
      this.matIconRegistry.addSvgIcon(
        icon.name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`/assets/icons/${icon.svgRelativePath}`)
      );
    }
  }
}
