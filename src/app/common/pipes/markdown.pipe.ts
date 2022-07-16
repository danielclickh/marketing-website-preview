import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {convertMarkdown} from "../utils/MarkdownUtils";

@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {
  }

  transform(value: string): unknown {
    return this.sanitized.bypassSecurityTrustHtml(convertMarkdown(value));
  }

}
