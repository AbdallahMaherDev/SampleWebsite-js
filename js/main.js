//settings-box
document.querySelector(".settings-box .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};

// color
let getOptionColol = localStorage.getItem("color-option");
if (getOptionColol !== null) {
  document.documentElement.style.setProperty("--main-color", getOptionColol);

  document.querySelectorAll(".color-option li").forEach((ele) => {
    ele.classList.remove("active");
    if (ele.dataset.color === getOptionColol) {
      ele.classList.add("active");
    }
  });
}
let opchanColor = document.querySelectorAll(".colors-list li");
opchanColor.forEach((element) => {
  element.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color-option", e.target.dataset.color);
    handellActive(e);
  });
});
// backgrwond
let locForBG = localStorage.getItem("backgrand-option");
let imgTrue = true;
let contImges;
let diration = 1000;
let backGrImgs = document.querySelector(".landing-page");
const controlImge = document.querySelectorAll(".random-backgrounds span");

if (locForBG !== null) {
  document.querySelectorAll(".random-backgrounds span").forEach((ele) => {
    ele.classList.remove("active");
  });
  if (locForBG === "true") {
    imgTrue = true;
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    imgTrue = false;
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

let arrOfAmg = [
  "cat.2.jpg",
  "cat.3.jpg",
  "cat.4.jpg",
  "cat.5.jpg",
  "cat.6.jpg",
  "cat.7.jpg",
  "cat.8.jpg",
  "cat.1.jpg",
];

controlImge.forEach((element) => {
  element.addEventListener("click", (e) => {
    handellActive(e);
    if (e.target.dataset.background === "yes") {
      imgTrue = true;
      randomeImgs();
      localStorage.setItem("backgrand-option", true);
    } else {
      imgTrue = false;
      clearInterval(contImges);
      localStorage.setItem("backgrand-option", false);
    }
  });
});

function randomeImgs() {
  if (imgTrue === true) {
    contImges = setInterval(() => {
      let randomImge = Math.floor(Math.random() * arrOfAmg.length);
      backGrImgs.style.backgroundImage =
        'url("imge/' + arrOfAmg[randomImge] + '")';
    }, diration);
  }
}
randomeImgs();
// bullets
const naveLockS = localStorage.getItem("bullets-option");
const bulletsOption = document.querySelectorAll(".bullets-option span");
const navBullets = document.querySelector(".nav-bullets");

if (naveLockS !== null) {
  document.querySelectorAll(".bullets-option span").forEach((ele) => {
    ele.classList.remove("active");
  });
  if (naveLockS === "block") {
    navBullets.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    navBullets.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}
bulletsOption.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    if (ele.dataset.display === "show") {
      navBullets.style.display = "block";
      localStorage.setItem("bullets-option", "block");
    } else {
      navBullets.style.display = "none";
      localStorage.setItem("bullets-option", "none");
    }
    handellActive(e);
  });
});
const bulletsNav = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links a");
function bullite(ele) {
  ele.forEach((e) => {
    e.addEventListener("click", (e) => {
      e.preventDefault();
      const found = document.querySelector(e.target.dataset.section);
      if (found) {
        found.scrollIntoView({ behavior: `smooth` });
      }
    });
  });
}
bullite(bulletsNav);
bullite(allLinks);

const resetOptions = (document.querySelector(".reset-options").onclick =
  function () {
    localStorage.removeItem("color-option");
    localStorage.removeItem("backgrand-option");
    localStorage.removeItem("bullets-option");
    localStorage.removeItem("heder-option");

    window.location.reload();
  });

// our-skill
let skillsBox = document.querySelector(".skills");
window.addEventListener("scroll", () => {
  let skillOffsetTop = skillsBox.offsetTop;
  let skillHeight = skillsBox.offsetHeight;
  let windowHeight = window.innerHeight;
  let windowScrollTop = window.pageYOffset;
  console.log(windowScrollTop);
  if (windowScrollTop > skillOffsetTop + skillHeight - windowHeight) {
    document
      .querySelectorAll(".skills-box .skill-progris span")
      .forEach((spn) => {
        spn.style.width = spn.dataset.progress;
      });
  }
});

let gallary = document.querySelectorAll(".gallery img");
gallary.forEach((img) => {
  img.addEventListener("click", (e) => {
    let divForOver = document.createElement("div");
    divForOver.className = "popup-overlay";
    document.body.appendChild(divForOver);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      let popupH2 = document.createElement("h3");
      popupH2.appendChild(document.createTextNode(img.alt));
      popupBox.appendChild(popupH2);
    }

    let popupImge = document.createElement("img");
    popupImge.src = img.src;
    popupBox.appendChild(popupImge);
    divForOver.appendChild(popupBox);

    let closeText = document.createElement("span");
    closeText.className = "close-button";
    closeText.appendChild(document.createTextNode("x"));
    popupBox.appendChild(closeText);
    // Close popup when clicking on the overlay
    // Close popup when clicking on the close button
    divForOver.addEventListener("click", (e) => {
      if (e.target === divForOver || e.target === closeText) {
        divForOver.remove();
      }
      // Prevent closing when clicking on the popup box or image
      popupBox.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    });
  });
});
// document.addEventListener("click", (e) => {
//   if (e.target.className == "close-button") {
//     e.target.parentNode.remove();
//     document.querySelector(".popup-overlay").remove();
//   }
// });

function handellActive(e) {
  e.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });

  e.target.classList.add("active");
}

//   heder
let header = document.querySelector(".header-area");
window.onscroll = function () {
  makeSticky();
};
var sticky = header.offsetTop;

function makeSticky() {
  if (
    window.pageYOffset > sticky &&
    localStorage.getItem("heder-option") === "show"
  ) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
let headerLi = document.querySelectorAll(".header-area li");
let headerLiA = document.querySelectorAll(".header-area li a");
// Function to save the active index to localStorage
function saveActiveIndex(index) {
  localStorage.setItem("activeIndex", index);
}
// Function to load the active index from localStorage
// Apply the active class based on the saved index
let activeIndex = localStorage.getItem("activeIndex");
if (activeIndex !== null) {
  document.querySelectorAll(".header-area li a").forEach((ele) => {
    ele.classList.remove("active");
  });
  headerLiA[activeIndex].classList.add("active");
}

headerLi.forEach((e, index) => {
  e.addEventListener("click", () => {
    document.querySelectorAll(".header-area li a").forEach((ele) => {
      ele.classList.remove("active");
    });
    e.querySelector("a").classList.add("active");
    saveActiveIndex(index); // Save the active index
  });
});

const hederOption = document.querySelectorAll(".heder-option span");
if (hederOption.length > 0) {
  const hederOptionLS = localStorage.getItem("heder-option");

  if (hederOptionLS !== null) {
    hederOption.forEach((ele) => {
      ele.classList.remove("active");
    });
    if (hederOptionLS === "show") {
      document.querySelector(".heder-option span.yes").classList.add("active");
    } else {
      document.querySelector(".heder-option span.no").classList.add("active");
    }
  }

  hederOption.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      handellActive(e);
      if (ele.dataset.heder === "show") {
        document
          .querySelector(".heder-option span.yes")
          .classList.add("active");
        localStorage.setItem("heder-option", "show");
        header.classList.add("sticky");
      } else {
        document.querySelector(".heder-option span.no").classList.add("active");
        localStorage.setItem("heder-option", "hide");
        header.classList.remove("sticky");
      }
    });
  });
}
