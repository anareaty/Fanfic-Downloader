document.addEventListener("DOMContentLoaded", () => {
  let onOff = document.getElementById("onOff");

  let toggle = (a) => {
    if (a) {
      onOff.innerHTML = "Выключить";
      onOff.style.color = "red";
    } else {
      onOff.innerHTML = "Включить";
      onOff.style.color = "blue";
    }
  }

  chrome.storage.local.get(["extensionOn"], result => {
    if (result.extensionOn == false) toggle(false);
     else toggle(true);
   });

   onOff.onclick = () => {
     chrome.storage.local.get(["extensionOn"], result => {
       if (result.extensionOn == false) {
         chrome.storage.local.set({"extensionOn": true});
         toggle(true);
       } else {
         chrome.storage.local.set({"extensionOn": false});
         toggle(false);
       }
     });
   }

  document.getElementById('downloadAll').onclick = () => {
    chrome.tabs.executeScript({
      file: "massdownload.js"
    });
  };

  document.getElementById('downloadUpdates').onclick = () => {
    chrome.tabs.executeScript({
      file: "downloadUpdates.js"
    });
  };



});
