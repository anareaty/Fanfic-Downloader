chrome.storage.local.get(["Ao3", "Ao3Format", "extensionOn", "bookmarks"], result => {

  if (result.extensionOn != false) {

    // Скачивание файла при открытии страницы
    //Форматы: 1-AZW3, 2-EPUB, 3-MOBI, 4-PDF, 5-HTML
    if (result.Ao3 == true && /archiveofourown\.org\/works.*/.test(location.href)) {
      let Ao3Format = result.Ao3Format;
      if (Ao3Format === undefined) Ao3Format = 2;
      location.href="https://archiveofourown.org/" +
      document.querySelector(".download > ul > li:nth-child(" + Ao3Format + ") > a")
      .getAttribute("href");
    }

    // Добавление в закладки при открытии страницы
    if (result.bookmarks == true) {
      // Проверяем, не заблокирована ли страница
      let pageBlocked = /Retry later/.test(document.querySelector('body').innerText)
      // Добавляем закладку
      if (/archiveofourown\.org\/works.*/.test(location.href)) {
        let bookmarkButton = document.getElementsByClassName("bookmark_form_placement_open")[0]
        if (bookmarkButton.innerHTML == "Bookmark") {
          bookmarkButton.click();
          let submitButton = document.querySelector("#bookmark-form > form > fieldset > fieldset > p > input")
          submitButton.form.submit()
        } else {
          // Закрываем окно, если закладка уже добавлена
          if (window.closable && !pageBlocked) window.close();
        }
      }
      // Закрываем страницу после добавления закладки или перенаправляем назад к фанфику
      if (/archiveofourown\.org\/bookmarks\/\d.*/.test(location.href)) {
        if (!pageBlocked) {
          if (window.closable) {
            window.close()
          } else {
            let ficLink = document.querySelector("div.header.module > h4 > a");
            ficLink.click();
          }

        }


      }
    }

  }
});
