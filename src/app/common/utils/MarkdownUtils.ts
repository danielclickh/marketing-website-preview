import Showdown from 'showdown';


Showdown.extension('highlightjs', function () {
  function htmlDecode(text: string) {
    return (
      text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
    );
  }

  // use new showdown's regexp engine to conditionally parse codeblocks
  const left = '<pre><code\\b[^>]*>';
  const right = '</code></pre>';
  const flags = 'g';

  function replacement(_wholeMatch: any, match: any, left: string, right: string) {
    // unescape match to prevent double escaping
    match = htmlDecode(match);
    if (window) {
      return left + (window as any).hljs.highlightAuto(match, ['javascript', 'sql', 'bash', 'cpp', 'typescript']).value + right;
    }
    return left + match + right;
  }

  return [
    {
      type: 'output',
      filter: function (text, _converter, _options) {
        return Showdown.helper.replaceRecursiveRegExp(text, replacement, left, right, flags);
      }
    }
  ];
});

const converter = new Showdown.Converter({
  noHeaderId: false,
  customizedHeaderId: true,
  tables: true,
  extensions: ['highlightjs']

});

export function convertMarkdown(markdown: string) {
  return converter.makeHtml(markdown);
}
