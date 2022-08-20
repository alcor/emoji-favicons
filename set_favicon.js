(async () => {

  var linkEl = document.querySelector("link[rel*='icon']")
  
  function setFaviconEmoji(emoji) {
    if (!linkEl) {
      var documentHead = document.getElementsByTagName("head")[0];
      linkEl = documentHead.appendChild(document.createElement("link"));
      linkEl.rel = "icon";
    }
    let href = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><text y=".9em">${emoji}</text></svg>`
    linkEl.href = href;
  }

  let lastTitle;
  function titleUpdated() {
    if (document.title != lastTitle) {
      let emojiRE = /(\p{Emoji}+)/u;
      let match = document.title.match(emojiRE); // true
      if (match) {
        lastTitle = document.title;
        if (match.index == 0) {
          document.title = lastTitle = lastTitle.replace(match[0], "").trim()
        }
        setFaviconEmoji(match[1]);
      }
    }
  }

  let links = Array.prototype.slice.call(document.getElementsByTagName("link")).filter((link) => 
    link.rel.toLowerCase().indexOf("icon") >= 0
  );

  new MutationObserver(titleUpdated).observe(document.querySelector("title"), {
    subtree: true, characterData: false, childList: true,
  })

  titleUpdated();
  
})();
