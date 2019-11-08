document.addEventListener("DOMContentLoaded", () => {

  chrome.storage.local.get(["Ao3", "FB", "Ao3Format", "FBFormat"], result => {
    if (result.Ao3 != false) {
      document.getElementById("Ao3").checked = true;
    }
    if (result.FB != false) {
      document.getElementById("FB").checked = true;
    }
    if (result.Ao3Format != undefined) {
      document.querySelector("#Ao3-format > label:nth-child(" + result.Ao3Format + ") > input[type=radio]").checked = true;
    }
    if (result.FBFormat != undefined) {
      document.querySelector("#FB-format > label:nth-child(" + result.FBFormat + ") > input[type=radio]").checked = true;
    }
  })

  document.getElementById("Ao3").onchange = () => {
  chrome.storage.local.set({
    "Ao3": document.getElementById("Ao3").checked})
  }
  document.getElementById("FB").onchange = () => {
    chrome.storage.local.set({
      "FB": document.getElementById("FB").checked})
  }

  document.getElementById("Ao3-format").onclick = () => {
    chrome.storage.local.set({
      "Ao3Format": document.getElementById("Ao3-format").elements['Ao3-format'].value})
  }

  document.getElementById("FB-format").onclick = () => {
    chrome.storage.local.set({
      "FBFormat": document.getElementById("FB-format").elements['FB-format'].value})
  }

})
