chrome.storage.local.get(["extensionOn", "bookmarks"], result => {
  if (result.extensionOn != false) {
    if (/archiveofourown\.org.*/.test(location.href)) {
      let bookmarksOn = result.bookmarks;
      if (!bookmarksOn) {
        chrome.storage.local.set({"bookmarks": true})
      }
      document.querySelectorAll("h4.heading > a:first-child")
      .forEach((a) => {
        let url = "https://archiveofourown.org" + a.getAttribute("href");
        let myWindow = window.open(url, '_blank');
        myWindow.closable = true;
      })
      if (!bookmarksOn) {
        let disableBookmarks = () => {chrome.storage.local.set({"bookmarks": false})};
        setTimeout(disableBookmarks, 30000);
      }
    }
  }
});
