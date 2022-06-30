export interface Feature {
  id: string;
  title: string;
  description: string;
  iconSvgId: string;
}

export interface ScreenshotAndBullets {
  id: string;
  title: string;
  description: string;
  bullets: Array<string>;
  screenshotPngUrl: string;
}
