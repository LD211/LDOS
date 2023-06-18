console.log("LDOS");
const desktop = document.getElementById("desktop");
const ldBar = document.getElementById("LDbar");
const programs = document.getElementById("programs");
const terminal = document.getElementById("terminal");
const searchBar = document.getElementById("searchbar");
const inputBar = document.getElementById("inputBar");
let processes = 0;
const apps = [
  "terminal",
  "photos",
  "videos",
  "file explorer",
  "chrome",
  "discord",
];

window.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.code === "Space") {
    if (searchBar.style.display !== "flex") {
      openSearchBar();
    } else {
      closeSearchBar();
    }
  }
});

inputBar.addEventListener("input", function (e) {
  let searchInput = inputBar.value;
  let regex = new RegExp(searchInput, "i");
});
inputBar.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    interpretSearchValue(inputBar.value.toLowerCase());
    inputBar.value = "";
    closeSearchBar();
  }
});

function interpretSearchValue(value) {
  if (value === "terminal") {
    openTerminal();
  }
}

function openTerminal() {
  terminal.style.width = window.innerWidth - 20 + "px";
  terminal.style.height = window.innerHeight - 60 + "px";
  terminal.style.display = "block";
  const terminalText = document.getElementById("terminaltext");
  terminalText.focus();
}

function openSearchBar() {
  searchBar.style.display = "flex";
  searchBar.style.animationPlayState = "running";
  inputBar.focus();
}

function closeSearchBar() {
  fadeOutBar(searchBar);
}

function fadeOutBar(element) {
  let opacity = 0.7;
  let fadeOut = setInterval(function () {
    if (opacity <= 0) {
      clearInterval(fadeOut);
      searchBar.style.display = "none";
      searchBar.style.opacity = "1";
    } else {
      opacity -= 0.01;
      searchBar.style.opacity = opacity;
    }
  }, 10);
}
