import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {trackById} from "../../utils/AngularUtils";
import {Feature} from "../../protocol/common.protocol";

@Component({
  selector: 'feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureListComponent {
  trackById = trackById;

  @Input()
  features!: Array<Feature>;

  constructor() {
  }
}
