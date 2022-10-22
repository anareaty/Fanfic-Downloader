document.addEventListener("DOMContentLoaded", () => {

  //Включить-выключить функции
  chrome.storage.local.get(["Ao3", "bookmarks"], result => {
    if (result.Ao3 == true) {
      document.getElementById("Ao3").checked = true;
    } else {
      document.getElementById("Ao3").checked = false;
    }

    if (result.bookmarks == true) {
      document.getElementById("bookmarks").checked = true;
    } else {
      document.getElementById("bookmarks").checked = false;
    }
  })

  document.getElementById("Ao3").onchange = () => {
  chrome.storage.local.set({
    "Ao3": document.getElementById("Ao3").checked})
  }

  document.getElementById("bookmarks").onchange = () => {
  chrome.storage.local.set({
    "bookmarks": document.getElementById("bookmarks").checked})
  }

  //Включить-выключить расширение
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

  //Запустить автоматическое скачивание фанфиков
  document.getElementById('downloadAll').onclick = () => {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, (tabs) => {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        files: ["massdownload.js"]
      });
    });
  };

  //Запустить автоматическое добавление в закладки
  document.getElementById('bookmarkAll').onclick = () => {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, (tabs) => {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        files: ["massbookmark.js"]
      });
    });
  };

});
