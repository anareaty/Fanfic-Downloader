chrome.storage.local.get(["Ao3", "FB", "extensionOn"], result => {
  if (result.extensionOn != false) {

  let Ao3 = result.Ao3;
  let FB = result.FB;
  if (Ao3 === undefined) Ao3 = true;
  if (FB === undefined) FB = true;

  if (/https:\/\/archiveofourown\.org.*/.test(location.href) && Ao3 == true) {
    document.querySelectorAll("h4.heading > a:first-child")
    .forEach(a => window.open("https://archiveofourown.org/" + a.getAttribute("href"), '_blank'))
  }

  if (/https:\/\/ficbook\.net.*/.test(location.href) && FB == true) {
    document.querySelectorAll("a.visit-link")
    .forEach(a => window.open("https://ficbook.net" + a.getAttribute("href"), '_blank'))
  }

}
});
