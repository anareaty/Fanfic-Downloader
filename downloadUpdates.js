chrome.storage.local.get(["extensionOn", "lastUpdates"], result => {
  if (result.extensionOn != false) {

    if (/archiveofourown\.org.*/.test(location.href)) {

      const downloadWorks = (date) => {
        let exit = false;
        let allWorks = document.querySelectorAll(".blurb > div")
        allWorks.forEach((a) => {

          let workDate = new Date(a.querySelector("p.datetime").innerText);
          if (workDate >= date) {

            let link = a.querySelector("h4.heading > a:first-child")
            let number = link.getAttribute("href").replace("works", "");
            let title = link.innerText;
            let url = "https://archiveofourown.org/downloads" + number + "\/" + title + "\." + "epub";
            window.open(url, '_blank')

          } else {exit = true}

        })
        if (exit == false) {
          alert("Возможно, есть ещё обновления! Проверьте следующую страницу.")
        } else {
          alert("Все обновления скачаны.")
        }
      }



      const fixDate = (str) => {
        if (str.length < 2) str = "0" + str;
        return str;
      }



      const stringifyDate = (date) => {
        return fixDate(date.getDate().toString()) + "." + fixDate((date.getMonth() + 1).toString()) + "." + date.getFullYear();
      }



      const saveNewDate = (urlSaved) => {
        if (urlSaved == true) {

          lastUpdates = lastUpdates.map((a) => {
            if (a.url === thisUrl) {
              a.date = new Date().toString();
            }
            return a;
          })

        } else {

          let thisUpdate = {"url": location.href, "date": new Date().toString()}
          lastUpdates.push(thisUpdate);

        }
      }



      const chooseDateAndDownload = (dateString, urlSaved) => {

        let userDate = prompt("Укажите дату, после которой скачивать обновления, в формате ДД.ММ.ГГГГ", dateString)
        if (userDate != null) {

          userDate = new Date(userDate.replace(/(\d\d\.)(\d\d\.)(.*)/, "$2$1$3"))
          if (userDate != "Invalid Date") {

            downloadWorks(userDate);
            saveNewDate(urlSaved);

          } else {
            alert ("Некорректная дата!")
          }
        } else {alert("Укажите дату!")}
      }




      let lastUpdates = result.lastUpdates;

      if (lastUpdates === undefined) {
        lastUpdates = [];
      }

      let thisUrl = location.href;
      let thisLastUpdate = lastUpdates.filter(a => a.url === thisUrl)

      if (thisLastUpdate.length != 0) {

        let lastDate = new Date(thisLastUpdate[0].date);
        let dateString = stringifyDate(lastDate);
        let usePreviousDate = confirm("Дата предыдущего обновления - " + dateString + ". Хотите загрузить обновления с этой даты?");
        if (usePreviousDate === true) {

          downloadWorks(lastDate);
          saveNewDate(true)

        } else {

          chooseDateAndDownload(dateString, true)
        }

      } else {

        let lastDate = new Date();
        lastDate.setDate(lastDate.getDate() - 1);
        let dateString = stringifyDate(lastDate);

        chooseDateAndDownload(dateString, false)

      }

      chrome.storage.local.set({
        "lastUpdates": lastUpdates})

    }


  }
})
