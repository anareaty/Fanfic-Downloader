chrome.storage.local.get(["Ao3Format", "FBFormat", "extensionOn"], result => {
  if (result.extensionOn != false) {

  let FBFormats = {1: "txt", 2: "epub", 3: "pdf", 4: "fb2"}
  let FBFormat = FBFormats[result.FBFormat];
  if (FBFormat === undefined) FBFormat = "epub";

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

  if (/https:\/\/ficbook\.net.*/.test(location.href)) {
      document.querySelectorAll("a.visit-link")
    .forEach((a, i) => setTimeout(() => {window.open("https://ficbook.net" + a.getAttribute("href").replace(/(.*)(\?)(.*)/, "$1") + "/download", '_blank')}, 500*i))
  }


}
});
