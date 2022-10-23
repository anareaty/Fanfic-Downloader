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
            // Закладки на этот фик ещё нет
            // Нажимаем на кнопки для добавления закладки
            bookmarkButton.click();
            let submitButton = document.querySelector("#bookmark-form > form > fieldset > fieldset > p > input")
            submitButton.form.submit()
          } else {
            // Закладка уже добавлена
            // Закрываем вкладку, если она открыта через массовое добавление и не заблокирована
            if (window.closable && !pageBlocked) window.close();
            // Если вкладка открыта вручную, ничего не делаем
          }
        }

      }
      // Закрываем страницу после добавления закладки или перенаправляем назад к фанфику
      if (/archiveofourown\.org\/bookmarks\/\d.*/.test(location.href)) {
        if (!pageBlocked) {
          window.close()
        }



//        if (true) {
//          if (window.closable) {
//            window.close()
//          } else {
//            window.history.back()
//            let ficLink = document.querySelector("div.header.module > h4 > a");
//            ficLink.click();
//          }
//        }



    }

  }
});
