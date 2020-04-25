chrome.storage.local.get(["Ao3", "FB", "Ao3Format", "FBFormat", "extensionOn"], result => {
  if (result.extensionOn != false) {

    let FBFormats = {1: "txt", 2: "epub", 3: "pdf", 4: "fb2"}

    let Ao3Format = result.Ao3Format;
    let FBFormat = FBFormats[result.FBFormat];

    if (Ao3Format === undefined) Ao3Format = 2;
    if (FBFormat === undefined) FBFormat = "epub";


    //Форматы Ao3: 1-AZW3, 2-EPUB, 3-MOBI, 4-PDF, 5-HTML
    if (/archiveofourown\.org\/works.*/.test(location.href) && result.Ao3 == true) {
      location.href="https://archiveofourown.org/" +
      document.querySelector(".download > ul > li:nth-child(" + Ao3Format + ") > a")
      .getAttribute("href");
    }

    if (/ficbook\.net\/readfic.*/.test(location.href) && result.FB == true) {
    location.href = location.href.replace("readfic", "fanfic_download\/" + FBFormat)
    }

  }
});
