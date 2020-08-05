document.addEventListener("DOMContentLoaded", () => {

  chrome.storage.local.get(["Ao3", "FB", "Ao3Format", "FBFormat", "Ao3Downloaded", "allowAo3Reminder"], result => {
    if (result.Ao3 == true) {
      document.getElementById("Ao3").checked = true;
    } else {
      document.getElementById("Ao3").checked = false;
    }

    if (result.FB == true) {
      document.getElementById("FB").checked = true;
    } else {
      document.getElementById("FB").checked = false;
    }

    if (result.Ao3Format != undefined) {
      document.querySelector("#Ao3-format > label:nth-child(" + result.Ao3Format + ") > input[type=radio]").checked = true;
    }
    if (result.FBFormat != undefined) {
      document.querySelector("#FB-format > label:nth-child(" + result.FBFormat + ") > input[type=radio]").checked = true;
    }

    if (result.allowAo3Reminder != false) {
      document.getElementById("allowAo3Reminder").checked = true;
    } else {
      document.getElementById("allowAo3Reminder").checked = false;
    }

    document.getElementById("clearNotRemindFlags").onclick = () => {
      let Ao3Downloaded = result.Ao3Downloaded;
      if (Ao3Downloaded === undefined) {
        return
      } else if (Ao3Downloaded.length == 0) {
        return
      } else {
        Ao3Downloaded = Ao3Downloaded.map((a) => {
          a.remind = true
          return a
        })
        chrome.storage.local.set({"Ao3Downloaded": Ao3Downloaded})
    }
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

  document.getElementById("allowAo3Reminder").onchange = () => {
  chrome.storage.local.set({
    "allowAo3Reminder": document.getElementById("allowAo3Reminder").checked})
  }

  document.getElementById("deleteFicData").onclick = () => {
    chrome.storage.local.set({"Ao3Downloaded": []})
  }




})
