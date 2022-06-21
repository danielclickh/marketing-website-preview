import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {HeaderService} from "./header.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  constructor(private readonly headerService: HeaderService) {
    headerService.getHeaderData().then(res => {
      console.log('Result', res);
    });
  }

  ngOnInit(): void {
  }

}
