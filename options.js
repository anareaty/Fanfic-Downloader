document.addEventListener("DOMContentLoaded", () => {

  chrome.storage.local.get(["Ao3Format"], result => {
    if (result.Ao3Format != undefined) {
      document.querySelector("#Ao3-format > label:nth-child(" + result.Ao3Format + ") > input[type=radio]").checked = true;
    }
  })

  document.getElementById("Ao3-format").onclick = () => {
    chrome.storage.local.set({
      "Ao3Format": document.getElementById("Ao3-format").elements['Ao3-format'].value})
    }

})
