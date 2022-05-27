import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-homepage-layout',
  templateUrl: './homepage-layout.component.html',
  styleUrls: ['./homepage-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageLayoutComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
