import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {NewsItem} from "../news-and-events.protocol";

@Component({
  selector: 'news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsItemComponent implements OnInit {
  @Input()
  item!: NewsItem;

  constructor() {
  }

  ngOnInit(): void {
  }

}
