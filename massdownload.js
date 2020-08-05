chrome.storage.local.get(["Ao3Format", "FBFormat", "extensionOn", "Ao3Downloaded", "allowAo3Reminder"], result => {
  if (result.extensionOn != false) {

  let FBFormats = {1: "txt", 2: "epub", 3: "pdf", 4: "fb2"}
  let FBFormat = FBFormats[result.FBFormat];
  if (FBFormat === undefined) {FBFormat = "epub"};

  let Ao3Formats = {1: "azw3", 2: "epub", 3: "mobi", 4: "pdf", 5: "html"}
  let Ao3Format = Ao3Formats[result.Ao3Format];
  if (Ao3Format === undefined) {Ao3Format = "epub"};

  let Ao3Downloaded = result.Ao3Downloaded;
  if (Ao3Downloaded === undefined) {Ao3Downloaded = []};

  console.log(Ao3Downloaded)

  let allowAo3Reminder = result.allowAo3Reminder;

  if (allowAo3Reminder === undefined) {allowAo3Reminder = true}


  if (/archiveofourown\.org.*/.test(location.href)) {




    if ((Ao3Downloaded.length != 0 && Ao3Downloaded.some((a) => a.remind == true)) && allowAo3Reminder == true) {
      let reminder = document.createElement("div");
      reminder.id = "reminder";

      let reminderStyle = {
        width: "500px",
        height: "500px",
        backgroundColor: "red",
        position: "absolute",
        margin: "auto",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0"
      }
      Object.assign(reminder.style, reminderStyle);

      reminder.innerHTML = `<div>Вы ранее скачивали эти фанфики. Не хотите оставить к ним кудос или комментарий?</div>
        <div style="height: 400px; overflow: auto; margin: 10px" id="ficListContainer"></div>`


        let remindFooter = document.createElement("div");
        remindFooter.style.display = "grid"
        remindFooter.style.gridTemplateColumns = "50% 50%"
        let notRemindLine = document.createElement("div");
        notRemindLine.appendChild(document.createTextNode("Больше не показывать  "))
        let notRemindCheckbox = document.createElement("input");
        notRemindCheckbox.type = "checkbox";
        notRemindLine.appendChild(notRemindCheckbox)
        remindFooter.appendChild(notRemindLine)
        let closeButton = document.createElement("button");
        closeButton.onclick = () => {
          if (notRemindCheckbox.checked == true) {
            chrome.storage.local.set({"allowAo3Reminder": false})
            console.log(false)
          }
          document.body.removeChild(reminder)}


        closeButton.innerText = "Закрыть это окно"
        remindFooter.appendChild(closeButton)
        reminder.appendChild(remindFooter)





      let ficList = () => {
        Ao3Downloaded.filter((a, i) => a.remind == true).forEach((a, i, arr) => {
          let title = document.createElement("span");
          let notRemindButton = document.createElement("button");
          let deleteButton = document.createElement("button");

          let ficLine = document.createElement("div");
          ficLine.appendChild(title)
          ficLine.appendChild(notRemindButton)
          ficLine.appendChild(deleteButton)
          ficLine.style.display = "grid";
          ficLine.style.gridTemplateColumns = "70% 15% 15%";

          let ficListContainer = document.getElementById("ficListContainer");
          ficListContainer.appendChild(ficLine)

          title.innerHTML = "<a href=" + a.link + ">" + a.title + "</a>"
          notRemindButton.innerText = "Не напоминать"
          deleteButton.innerText = "Удалить"
          notRemindButton.onclick = () => {
            //пометить объект как скрытый
            a.remind = false;
            chrome.storage.local.set({"Ao3Downloaded": Ao3Downloaded})
            console.log(Ao3Downloaded)
            //убрать элемент со страницы
            ficListContainer.removeChild(ficLine)
          }
          deleteButton.onclick = () => {
            // Удалить объект из массива
            let index = Ao3Downloaded.indexOf(a)
            Ao3Downloaded.splice(index, 1);
            chrome.storage.local.set({"Ao3Downloaded": Ao3Downloaded});
            //Убрать элемент со страницы
            ficListContainer.removeChild(ficLine)

          }



        })
      }


      document.body.appendChild(reminder)
      ficList()

    }



    document.querySelectorAll(".header.module")
    .forEach((a) => {
      let link = a.querySelector("a")
      let ficUrl = link.getAttribute("href")
      let downloadUrl = "https://archiveofourown.org/downloads" + ficUrl.replace("works", "") + "\/" + "download" + "\." + Ao3Format;


      let date = a.querySelector(".datetime").innerText
      let ficObj = {"title": link.innerText, "link": "https://archiveofourown.org" + ficUrl, "date": date, "remind": true}

      let isDownloaded = Ao3Downloaded.some((a) => a.link == ficObj.link && a.date == ficObj.date)
      if (!isDownloaded){
        Ao3Downloaded.push(ficObj)
        window.open(downloadUrl, '_blank')
      }

    })





    //отладка
    //Ao3Downloaded = []
    //console.log(Ao3Downloaded)






    chrome.storage.local.set({"Ao3Downloaded": Ao3Downloaded})
  }

  if (/ficbook\.net.*/.test(location.href)) {
    document.querySelectorAll("a.visit-link")
    .forEach((a) => {
      let url = "https://ficbook.net" + a.getAttribute("href").replace("readfic", "fanfic_download\/" + FBFormat);
      window.open(url, '_blank')
    })
  }


}
});
