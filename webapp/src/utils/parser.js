export function parseAsHtml(txt) {
  // simplified markdown parser
  // external links can be marked as [text](//foo.com/)
  // internal links should be marked as [text](~/foo-page)
  // only html allowed is <u>...</u> and <br>
  return (txt && txt
    /* remove carriage returns (but leave linefeeds) */
    .replace(/\r/, "")
    /* temporarily replace underlined formatting */
    .replace(/<\/?u>/g, "⇿")
    /* temporarily replace un-escaped br formatting */
    .replace(/(?<!`)<br\/?>/g, "↩")
    /* escape any html element code */
    .replace(/</g, "&lt;")
    /* restore underlined */
    .replace(/⇿(.*)⇿/g, "<u>$1</u>")
    /* restore br */
    .replace(/↩/g, "<br>")
    /* horizontal rule */
    .replace(/----+\n/g, "<hr>")
    /* code block */
    .replace(/```\n([^`]+)\n```\n/g, "<pre>$1</pre>")
    /* inline code fragment */
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    /* headers h1 to h6 */
    .replace(/(#+) ([^{\n]*)(?:{#([^}]*)})?/g, function(_full, chars, header, id){
      var level = chars.length;
      var idAttr = id ? ' id="' + id + '"' : '';
      return '<h'+level + idAttr +'>'+header.trim()+'</h'+level+'>';
    })
    /* block quote */
    .replace(/^\> (.*)/gim, '<blockquote>$1</blockquote>')
    .replace(/<\/blockquote>\n<blockquote>/g,"<br>")
    /* strong emphasis aka bold */
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    /* emphasis aka italics */
    .replace(/\*([^*]+)\*/g, "<i>$1</i>")
    /* strikethrough */
    .replace(/~~(.*?)~~/g, "<del>$1</del>")
    /* nested unordered list (indented with 4 spaces) */
    .replace(/\n    - (.*)/g, function(_full, item){
      return '<ul><li>'+item.trim()+'</li></ul>'
    })
    .replace(/<\/ul><ul>/g,"")
    /* unordered list */
    .replace(/\n- (.*)/g, function(_full, item){
      return '<ul><li>'+item.trim()+'</li></ul>'
    })
    .replace(/<\/ul><ul>/g,"")
    /* nested ordered list (indented with 4 spaces) */
    .replace(/\n    [0-9]+\. (.*)/g, function(_full, item){
      return '<ol><li>'+item.trim()+'</li></ol>'
    })
    .replace(/<\/ol><ol>/g,"")
    /* ordered list */
    .replace(/\n[0-9]+\. (.*)/g, function(_full, item){
      return '<ol><li>'+item.trim()+'</li></ol>'
    })
    .replace(/<\/ol><ol>/g,"")
    /* image */
    .replace(/!\[([^\]]+)\]\(([^)]+)\)/g, '<img src="/img/event/$2" alt="$1" style="max-width:100%;"/>' )
    /* internal link */
    .replace(/\[([^\]]+)\]\(~([^)]+)\)/g, '<a href="$2">$1</a>' )
    /* external link */
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a><i class="icon-Outbound deemph"></i>' ))
    .replace(/\n\n/g, "<br>")
    .trim() || "";
}

export function parseAsText(txt) {
  // strip image and link formatting
  return (txt && txt
    .replace(/!\[([^\]]+)\]\(([^)]+)\)/g, '' )
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1' ))
    .trim() || "";
}