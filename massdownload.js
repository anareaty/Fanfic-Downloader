chrome.storage.local.get(["Ao3Format", "extensionOn"], result => {
  if (result.extensionOn != false) {

  
  


  let Ao3Formats = {1: "azw3", 2: "epub", 3: "mobi", 4: "pdf", 5: "html"}
  let Ao3Format = Ao3Formats[result.Ao3Format];
  if (Ao3Format === undefined) Ao3Format = "epub";

  if (/archiveofourown\.org.*/.test(location.href)) {
    document.querySelectorAll("h4.heading > a:first-child")
    .forEach((a) => {
      let number = a.getAttribute("href").replace("works", "");
      let url = "https://archiveofourown.org/downloads" + number + "\/" + "download" + "\." + Ao3Format;
      window.open(url, '_blank')
    })
  }

  
      



}
});
