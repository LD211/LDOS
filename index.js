console.log("LDOS");
const desktop = document.getElementById("desktop");
const ldBar = document.getElementById("LDbar");
const programs = document.getElementById("programs");
const terminal = document.getElementById("terminal");
const searchBar = document.getElementById("searchbar");
const inputBar = document.getElementById("inputBar");
let fileSystem = {
  name: "root",
  type: "directory",
  children: {
    home: {
      name: "home",
      type: "directory",
      children: {
        user: {
          name: "user",
          type: "directory",
          children: {},
        },
      },
    },
    coolstuff: {
      name: "coolstuff",
      type: "directory",
      children: {
        testFile: {
          name: "testFile",
          type: "file",
          children: {},
        },
      },
    },
  },
};
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
  } else if (searchBar.style.display === "flex" && event.key === "Escape") {
    closeSearchBar();
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

async function interpretSearchValue(value) {
  await sleep(750);
  if (value === "terminal") {
    openTerminal();
  }
}

function openTerminal() {
  tileProcess(terminal);
  const terminalText = document.getElementById("terminaltext");
  terminalText.focus();
  terminalText.addEventListener("input", (event) => {
  });
  terminalText.addEventListener("keydown", (enter) => {
    if (enter.key === "Enter") {
      interpretTerminalCommand(terminalText.value);
      terminalText.value = "";
    }
  });

  terminal.addEventListener("click", () => {
    terminalText.focus();
  });
}

function cd(directory, currentDirectory) {
  if (directory === "..") {
    if (currentDirectory.name !== "/") {
      currentDirectory = currentDirectory.parent;
    }
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function interpretTerminalCommand(command) {
  const terminalOutput = document.getElementById("terminaloutput");
  let ps1 = document.getElementById("ps1");
  let clone = ps1.cloneNode(true);
  document.getElementById("terminaloutput").appendChild(clone);

  if (command === "hi") {
    commandOutput("hello");
  } else if (command === "clear") {
    terminalOutput.innerHTML = "";
  } else if (command === "whoami") {
    commandOutput("idfk");
  } else {
    commandOutput("");
  }
}

function commandOutput(outputs) {
  const terminalOutput = document.getElementById("terminaloutput");
  terminalOutput.innerHTML += "<br>" + outputs + "<br>";
}

function tileProcess(process) {
  process.style.display = "block";
  let width = 0;
  let height = 0;
  console.log(window.innerWidth);
  let getBigger = setInterval(function () {
    if (width > window.innerWidth - 21 || height > window.innerHeight - 21) {
      clearInterval(getBigger);
      process.style.width = window.innerWidth - 20 + "px";
      process.style.height = window.innerHeight - 60 + "px";
    } else {
      process.style.width = width + "px";
      process.style.height = height + "px";
      width += 20;
      height += 20;
      console.log("hi");
    }
  }, 3);
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
