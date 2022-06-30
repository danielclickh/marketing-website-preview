import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {trackById} from "../../utils/AngularUtils";
import {ScreenshotAndBullets} from "../../protocol/common.protocol";

@Component({
  selector: 'screenshot-and-bullets-list',
  templateUrl: './screenshot-and-bullets-list.component.html',
  styleUrls: ['./screenshot-and-bullets-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScreenshotAndBulletsListComponent {
  trackById = trackById;

  @Input()
  screenshotAndBulletsList!: Array<ScreenshotAndBullets>;

  constructor() {
  }
}
