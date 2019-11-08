let link = document.getElementsByClassName("download")[0].querySelectorAll("ul")[0].querySelectorAll("li")[1].querySelectorAll("a")[0];
let url = "https://archiveofourown.org/" + link.getAttribute("href");
document.location.href=url;
