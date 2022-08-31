async function updateFavicon(tab) {
  chrome.scripting.executeScript({
    files: ['./set_favicon.js'],
    target: {tabId:tab.id, allFrames:true}
  });
  showSuccess();
}
