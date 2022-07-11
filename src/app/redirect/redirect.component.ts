import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RedirectService} from "./redirect.service";

@Component({
  selector: 'app-redirect',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RedirectComponent {

  constructor(private readonly redirectService: RedirectService) {
    redirectService.redirectIfSpecified().then();
  }
}
