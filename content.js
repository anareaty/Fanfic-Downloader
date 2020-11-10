chrome.storage.local.get(["Ao3", "FB", "Ao3Format", "FBFormat", "extensionOn"], result => {
  if (result.extensionOn != false) {

    let Ao3Format = result.Ao3Format;
    let FBFormat = result.FBFormat;

    if (Ao3Format === undefined) Ao3Format = 2;
    if (FBFormat === undefined) FBFormat = 2;


    //Форматы Ao3: 1-AZW3, 2-EPUB, 3-MOBI, 4-PDF, 5-HTML
    if (/archiveofourown\.org\/works.*/.test(location.href) && result.Ao3 == true) {
      location.href="https://archiveofourown.org/" +
      document.querySelector(".download > ul > li:nth-child(" + Ao3Format + ") > a")
      .getAttribute("href");
    }


    //Фикбук
    //Автоматические скачивать при открытии страницы загрузки
    if (/https:\/\/ficbook\.net\/readfic.*download/.test(location.href)) {
      document.querySelector("#main > div.main-holder.alt > section > div > section:nth-child("+(FBFormat+1)+") > div > form > button").click()
      setTimeout(() => {window.close()}, 3000);
    }

    //Открывать страницу загрузки при открытии страницы фанфика
    if (/https:\/\/ficbook\.net\/readfic.*/.test(location.href) && !/download/.test(location.href) && result.FB != false) {
      window.open(location.href.replace(/(.*)(\?)(.*)/, "$1") + "/download")
    }

  }
});
