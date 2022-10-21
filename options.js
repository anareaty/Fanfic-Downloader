document.addEventListener("DOMContentLoaded", () => {

  chrome.storage.local.get(["Ao3", "Ao3Format"], result => {
    if (result.Ao3 == true) {
      document.getElementById("Ao3").checked = true;
    } else {
      document.getElementById("Ao3").checked = false;
    }

   
   
  
  


    if (result.Ao3Format != undefined) {
      document.querySelector("#Ao3-format > label:nth-child(" + result.Ao3Format + ") > input[type=radio]").checked = true;
    }
  
   
 
  })

  document.getElementById("Ao3").onchange = () => {
  chrome.storage.local.set({
    "Ao3": document.getElementById("Ao3").checked})
  }
  
  
  
  
  
  
  


  
  
  document.getElementById("Ao3-format").onclick = () => {
    chrome.storage.local.set({
      "Ao3Format": document.getElementById("Ao3-format").elements['Ao3-format'].value})
  }

  
  
  



 
  
  
  

})
