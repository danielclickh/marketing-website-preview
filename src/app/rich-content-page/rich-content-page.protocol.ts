import {SeoMetadata} from "../common/protocol/common.protocol";

export interface RichContentPageData {
  title: string;
  url: string;
  content: string;
  left_content: string;
  right_content: string;
  full_width_content: string;
  seo: SeoMetadata;
}