import Showdown from 'showdown';

const converter = new Showdown.Converter({
  noHeaderId: false,
  customizedHeaderId: true,
});

export function convertMarkdown(markdown: string) {
  return converter.makeHtml(markdown);
}
