chrome.storage.local.get(["Ao3", "FB", "Ao3Format", "FBFormat"], result => {

  let Ao3 = result.Ao3;
  let FB = result.FB;
  let Ao3Format = result.Ao3Format;
  let FBFormat = result.FBFormat;

  if (Ao3 === undefined) Ao3 = true;
  if (FB === undefined) FB = true;
  if (Ao3Format === undefined) Ao3Format = 2;
  if (FBFormat === undefined) FBFormat = 2;

  //Форматы Ao3: 1-AZW3, 2-EPUB, 3-MOBI, 4-PDF, 5-HTML
  if (/https:\/\/archiveofourown\.org.*/.test(location.href) && Ao3 == true) {
    location.href="https://archiveofourown.org/" +
    document.querySelector(".download > ul > li:nth-child(" + Ao3Format + ") > a")
    .getAttribute("href");
  }

  //Форматы фикбука: 1-TXT, 2-EPUB, 3-PDF, 4-FB2
  if (/https:\/\/ficbook\.net\/readfic.*/.test(location.href) && FB == true) {
    location.href="https://ficbook.net" +
    document.querySelector(".download-dropdown > ul > li:nth-child(" + FBFormat + ") > a")
    .getAttribute("href")
  }
});
