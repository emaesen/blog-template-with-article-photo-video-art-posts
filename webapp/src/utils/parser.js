export function parseAsHtml(txt, classNames, getMediaUrl) {
  // simplified markdown parser
  //
  // external links can be marked as 
  //   [text](//foo.com/) or [text](https://foo.com)
  // internal links should be marked as 
  //   [text](/foo-page/)
  // only html allowed is <u>...</u> and <br>
  // 
  // txt: string to be parsed
  // classNames: object with properties
  //    paraClassName
  //    imgClassName
  //    extLinkClassName
  //    extLinkIconClassName
  // getMediaUrl: function that returns a media url
  const paraClassName = classNames && classNames.paraClassName ? classNames.paraClassName : ""
  const imgClassName = classNames && classNames.imgClassName ? classNames.imgClassName : ""
  const extLinkClassName = classNames && classNames.extLinkClassName ? classNames.extLinkClassName : ""
  const extLinkIconClassName = classNames && classNames.extLinkIconClassName ? classNames.extLinkIconClassName : ""
  return (txt && ("\n" + txt.trim() + "\n\n")
    /* remove carriage returns (but leave linefeeds) */
    .replace(/\r/, "")
    /* temporarily replace underlined formatting */
    .replace(/<\/?u>/g, "⇿")
    /* temporarily replace br formatting */
    .replace(/<br\/?>/g, "↩")
    /* escape any html element code */
    .replace(/</g, "&lt;")
    /* restore underlined */
    .replace(/⇿(.*)⇿/g, "<u>$1</u>")
    /* restore br */
    .replace(/`↩`/g, "&lt;br>")
    .replace(/↩/g, "<br>")
    /* group related content in "paragraph" divs. 
     * has support for custom class attribute:
     * add a separate first line:
     * ~~my-special-class-name
     */
    .replace(/\n(?:~~(.+)\n)?([^]+?)\n(?=\n)/gim, function(full,specialClass,para){
      var classAttr = paraClassName
      if (para[0] === "#") {
        return full;
      }
      if (specialClass) {
        classAttr += " " + specialClass
      }
			return '\n<div class="' + classAttr + '">\n'+para+'\n</div>\n';
    })
    /* horizontal rule */
    .replace(/----+\n/g, "<hr>")
    /* char-encode code-inclosed liquid tag identifiers */
    .replace(/`{%/g, "`&#123;&#37;")
    .replace(/%}`/g, "&#37;&#125;`")
    /* inline code fragment */
    .replace(/ `([^`]+)`([ .!?,;'])/g, " <code>$1</code>$2")
    /* char-encode any remaining single back-ticks */
    .replace(/ `/g, " &#96;")
    .replace(/`([ .!?,'])/g, "&#96;$1")
    /* code block */
    .replace(/```\n([^`]+)\n```\n/g, function(_full, content){
      /* char-encode embedded liquid tag identifiers */
      content = content.replace(/%/g, "&#37;")
      /* restore embedded code fragments */
      content = content.replace(/<code>([^<]+)<\/code>/g, "`$1`")
      return "<pre class='code'>" + content + "</pre>\n"
    })
    /* headers h1 to h6 */
    .replace(/(#+) ([^{\n]*)(?:{#([^}]*)})?/g, function(_full, chars, header, id){
      var level = chars.length;
      var idAttr = id ? ' id="' + id + '"' : '';
      return '<h'+level + idAttr +'>'+header.trim()+'</h'+level+'>';
    })
    /* block quote */
    .replace(/^\> (.*)/gim, '<blockquote>$1</blockquote>')
    .replace(/<\/blockquote>\n<blockquote>/g,"<br>")
    /* quote citation */
    .replace(/\n    ~ (.+)/g, '<cite class="quote-cite">$1</cite>')
    /* strong emphasis aka bold */
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    /* emphasis aka italics */
    .replace(/\*([^*]+)\*/g, "<i>$1</i>")
    /* strikethrough */
    .replace(/~~(.*?)~~/g, "<del>$1</del>")
    /* triple-nested unordered list (indented with 12 spaces) */
    .replace(/\n            - (.*)/g, function(_full, item){
      return '<ul><li>'+item.trim()+'</li></ul>'
    })
    .replace(/<\/ul><ul>/g,"")
    /* double-nested unordered list (indented with 8 spaces) */
    .replace(/\n        - (.*)/g, function(_full, item){
      return '<ul><li>'+item.trim()+'</li></ul>'
    })
    .replace(/<\/ul><ul>/g,"")
    /* nested unordered list (indented with 4 spaces) */
    .replace(/\n    - (.*)/g, function(_full, item){
      return '<ul><li>'+item.trim()+'</li></ul>'
    })
    .replace(/<\/ul><ul>/g,"")
    /* unordered list */
    .replace(/\n- (.*)/g, function(_full, item){
      return '\n<ul><li>'+item.trim()+'</li></ul>'
    })
    .replace(/<\/ul>\n<ul>/g,"")
    /* nested ordered list (indented with 4 spaces) */
    .replace(/\n    [0-9]+\. (.*)/g, function(_full, item){
      return '<ol><li>'+item.trim()+'</li></ol>'
    })
    .replace(/<\/ol><ol>/g,"")
    /* ordered list */
    .replace(/\n[0-9]+\. (.*)/g, function(_full, item){
      return '\n<ol><li>'+item.trim()+'</li></ol>'
    })
    .replace(/<\/ol>\n<ol>/g,"")
    /* description list */
    .replace(/\n(.+)\n: (.+)/g, function(_full, term, desc){
      return '\n<dl><dt>'+term.trim()+'</dt><dd>' + desc.trim() + '</dd></dl>'
    })
    .replace(/<\/dl>\n<dl>/g,"")
    /* image */
    .replace(/!\[([^\]]+)\]\(([^)]+)\)/g, function(_full, alt, src){
      if (typeof getMediaUrl === "function") {
        src = getMediaUrl(src, false)
      }
      return '<img src="'+src+'" alt="'+alt+'" class="'+imgClassName+'"/>'
    })
    /* simple table */
    .replace(/\n\|.*\|\n/sg, function(all){
      let table="<table><thead><tr>"
      let rows = all.match(/\|.*\|\n/g)

      let alignments = rows[1].match(/\|[^|\n]+/g)
      alignments = alignments.map(x => {
        switch (x.replace(/-+/g, "-")) {
        case '|:-:':
          return 'center'
          break
        case '|-:':
          return 'right'
          break
        default:
          return 'left'
        }
      })

      let headCells = rows[0].match(/\|[^|\n]+/g)
      headCells = headCells.map((x,i) => {
        x = x.replace(/\|/g, "").trim()
        return '<th class="' + alignments[i] + '">' + x + '</th>'
      })

      table += headCells.join('') + '</tr></thead><tbody>'
      let bodyRows = rows.map((x,i) => {
        if(i<2) return ''
        let row = '<tr>'
        let cells = x.match(/\|[^|\n]+/g).map((x,j) => {
          return '<td class="' + alignments[j] + '">' + x.replace(/\|/g, "").trim() + '</td>'
        })
        return row + cells.join('') + '</tr>'
      })
      table += bodyRows.join('')
      table +="</tbody></table>"
      return table;
    })
    /* in-page hash link */
    .replace(/\[([^\]]+)\]\((#[^\)]*)\)/g, '<a href="$2">$1</a>' )
    /* internal link */
    .replace(/\[([^\]]+)\]\((\/[^\)]*)\)/g, '<a href="$2">$1</a>' )
    /* external link */
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer nofollow" class="' + extLinkClassName + '">$1</a>' + (extLinkIconClassName?'<i class="' + extLinkIconClassName + '"></i>':'') ))
    /* liquid tags */
    /* emph liquid tag */
    .replace(/{% emph '([^']+)' %}/g, "<span class='emph'>$1</span>")
    /* cssclass liquid tag */
    .replace(/{% cssclass '([^']+)' '([^']+)' %}/g, "<span class='$1'>$2</span>")
    /* sidenote liquid tag */
    .replace(/{% sidenote '([^']+)' %}/g, "<span class='side-note margin-note'>$1</span>")
    /* labelednote liquid tag */
    .replace(/{% labelednote '([^']+)' %}/g, "<span class='labeled-note-number'></span><span class='labeled-note margin-note'>$1</span>")
    /* add line breaks */
    //.replace(/\n\n/g, "<br>")
    .trim() || "";
}

export function parseAsText(txt) {
  // strip image and link formatting
  return (txt && txt
    .replace(/!\[([^\]]+)\]\(([^)]+)\)/g, '' )
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1' ))
    .trim() || "";
}