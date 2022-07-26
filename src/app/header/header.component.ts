import {ChangeDetectionStrategy, Component} from '@angular/core';
import {HeaderService} from "./header.service";
import {CpTheme, ThemeService} from "../common/services/theme.service";
import {trackById} from '../common/utils/AngularUtils';
import {Observable} from "rxjs";
import {HeaderTopNavItem, HeaderTopNavSubItem, RegularNavItem} from "./header.protocol";
import {SegmentService} from "../common/services/segment.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  readonly trackById = trackById;
  headerDataPromise = this.headerService.getHeaderData();
  themeObs: Observable<CpTheme>;
  mobileMenuVisible = false;

  constructor(private readonly headerService: HeaderService,
              private readonly themeService: ThemeService,
              readonly segmentService: SegmentService) {
    this.themeObs = themeService.observeTheme();
  }

  switchTheme(theme: CpTheme) {
    this.themeService.setTheme(theme, true);
  }

  isMenuWithIcons(topMenuItem: HeaderTopNavItem): boolean {
    return topMenuItem.menuItems.every(item => !!item.icon);
  }

  getMenuItemsWithIcons(menuItems: Array<HeaderTopNavItem>): Array<HeaderTopNavSubItem> {
    const result = [];
    for (const topLevelItem of menuItems) {
      result.push(...topLevelItem.menuItems.filter(i => !!i.icon));
    }
    return result;
  }

  getRegularMenuItems(menuItems: Array<HeaderTopNavItem>): Array<RegularNavItem> {
    const result = [];
    for (const topLevelItem of menuItems) {
      if (!topLevelItem.menuItems.length) {
        result.push(topLevelItem as RegularNavItem);
      } else {
        result.push(...topLevelItem.menuItems.filter(i => !i.icon));
      }

    }
    return result;
  }

  toggleMobileMenu() {
    this.mobileMenuVisible = !this.mobileMenuVisible;
  }
}
