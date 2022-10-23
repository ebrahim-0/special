// Random Image

let landingPage = document.querySelector(".landing-page");

const imgs = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
];

let backgroundOption = true;

let backgroundInterval;

if (localStorage.getItem("background_options") === "true") {
  randomizeImages();
  backgroundOption = true;
} else if (localStorage.getItem("background_options") === "false") {
  clearInterval(backgroundInterval);
  backgroundOption = false;
}

function randomizeImages() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let random = Math.floor(Math.random() * imgs.length);

      landingPage.style.backgroundImage = 'url("img/' + imgs[random] + '")';
    }, 5000);
  }
}
randomizeImages();

if (localStorage.getItem("background_options")) {
  document.querySelectorAll(".background span").forEach((element) => {
    element.classList.remove("active");
  });
  if (localStorage.getItem("background_options") === "true") {
    document.querySelector(".background .yes").classList.add("active");
  } else {
    document.querySelector(".background .no").classList.add("active");
  }
}

// Setting Spin

let gear = document.querySelector(".gear");
gear.onclick = function () {
  gear.classList.toggle("fa-spin");

  document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors

if (localStorage.getItem("color_option")) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color_option")
  );
  document.querySelectorAll(".colors li").forEach((element) => {
    element.classList.remove("active");
    if (element.dataset.color === localStorage.getItem("color_option")) {
      element.classList.add("active");
    }
  });
}
let colorsLi = document.querySelectorAll(".colors li");
colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color_option", e.target.dataset.color);

    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });

    e.target.classList.add("active");
  });
});

let randomBack = document.querySelectorAll(".background span");

randomBack.forEach((span) => {
  span.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });

    e.target.classList.add("active");
  });
});

randomBack.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (e.target.dataset.background === "yes") {
      backgroundOption == true;
      randomizeImages();
      localStorage.setItem("background_options", true);
      console.log(localStorage.getItem("background_options"));
    } else if (e.target.dataset.background === "no") {
      backgroundOption == false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_options", false);
      console.log(localStorage.getItem("background_options"));
    }
  });
});

let reset = document.querySelector(".reset-options button");

reset.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

let ourSkills = document.querySelector(".skills");
let spans = document.querySelectorAll(".skill-progress span");

window.onscroll = function () {
  if (window.scrollY >= ourSkills.offsetTop - 250) {
    spans.forEach((span) => {
      span.style.width = span.dataset.progress;
    });
  }
};

let imgsBox = document.querySelectorAll(".images-box img");
let gallery = document.querySelector(".gallery");

imgsBox.forEach((img) => {
  img.onclick = function () {
    let popUp = document.createElement("div");
    document.body.appendChild(popUp);
    popUp.className = "popup-overlay";
    let popupBox = document.createElement("div");
    document.body.appendChild(popupBox);
    popupBox.className = "popup-box";
    let imgBox = document.createElement("img");
    imgBox.src = img.src;
    popupBox.appendChild(imgBox);
    let title = document.createElement("h3");
    title.className = "popup-box--title";
    popupBox.prepend(title);
    title.appendChild(document.createTextNode(img.alt));
    let closePopup = document.createElement("span");
    popupBox.prepend(closePopup);
    closePopup.appendChild(document.createTextNode("X"));
    closePopup.className = "close-popup";
    closePopup.addEventListener("click", (e) => {
      popUp.remove();
      popupBox.remove();
    });
  };
});
