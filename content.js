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
      // Добавляем закладку
      if (/archiveofourown\.org\/works.*/.test(location.href)) {
        let bookmarkButton = document.getElementsByClassName("bookmark_form_placement_open")[0]
        if (bookmarkButton.innerHTML == "Bookmark") {
          // Закладки на этот фик ещё нет
          // Нажимаем на кнопки для добавления закладки
          bookmarkButton.click();
          let submitButton = document.querySelector("#bookmark-form > form > fieldset > fieldset > p > input")
          submitButton.form.submit()
          // Если этот фик уже есть в закладках, закрываем вкладку
        } else if (window.opener != null && !/Retry later/.test(document.querySelector('body').innerText)) window.close();
      }

      // Обрабатываем страницу после добавления закладки
      if (/archiveofourown\.org\/bookmarks\/\d.*/.test(location.href) && !/Retry later/.test(document.querySelector('body').innerText)) {
        if (window.opener != null) {
          // Если вкладка открыта через массовое добавление, закрываем её
          window.close()
        } else {
          // Если вкладка открыта вручную, перенаправляем обратно к фанфику
          let ficLink = document.querySelector("div.header.module > h4 > a");
          ficLink.click();
        }
      }
    }
  }
});
