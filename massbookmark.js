chrome.storage.local.get(["extensionOn", "bookmarks"], result => {
  if (result.extensionOn != false) {
    if (/archiveofourown\.org.*/.test(location.href)) {
      //Включаем автодобавление закладок
      let bookmarksOn = result.bookmarks;
      if (!bookmarksOn) {
        chrome.storage.local.set({"bookmarks": true})
      }

      //Открываем все фанфики в новых вкладках
      document.querySelectorAll("h4.heading > a:first-child")
      .forEach((a) => {
        let url = "https://archiveofourown.org" + a.getAttribute("href");
        window.open(url, '_blank');
      })

      //Выключаем автодобавление закладок, если оно было выключено до использования скрипта
      if (!bookmarksOn) {
        let disableBookmarks = () => {chrome.storage.local.set({"bookmarks": false})};
        setTimeout(disableBookmarks, 30000);
      }
    }
  }
});
