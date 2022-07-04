import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ThemeService} from "../common/services/theme.service";
import {OurStoryService} from "./our-story.service";

@Component({
  selector: 'app-our-story',
  templateUrl: './our-story.component.html',
  styleUrls: ['./our-story.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OurStoryComponent {
  ourStoryDataPromise = this.ourStoryService.getOurStoryData();
  themeObs = this.themeService.observeTheme();

  constructor(private readonly ourStoryService: OurStoryService,
              private readonly themeService: ThemeService) {
  }

}
