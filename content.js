chrome.storage.local.get(["Ao3", "Ao3Format", "extensionOn"], result => {
  if (result.extensionOn != false) {

    let Ao3Format = result.Ao3Format;


    if (Ao3Format === undefined) Ao3Format = 2;
    


    //Форматы Ao3: 1-AZW3, 2-EPUB, 3-MOBI, 4-PDF, 5-HTML
    if (/archiveofourown\.org\/works.*/.test(location.href) && result.Ao3 == true) {
      location.href="https://archiveofourown.org/" +
      document.querySelector(".download > ul > li:nth-child(" + Ao3Format + ") > a")
      .getAttribute("href");
    }




  }
});
