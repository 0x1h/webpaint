"use strict";
const rangeInput = document.querySelector(".range-input input");
const rangeValue = document.querySelector(".range-input .value div");
const hambugerMenu = document.querySelector("#nav-icon3");
const menu = document.querySelector(".side-menu");
const palleteCancel = document.querySelector(".Cancel");
const palleteSave = document.querySelector(".Save");
const colorChooser = document.querySelector(".color-chooser");
const palateColors = document.querySelectorAll(".choose-color");
const createColorBtn = document.querySelector(".createColor-btn");
const openSettingOne = document.querySelector(".color-pallete-container");
const paleteName = document.querySelector(".input-name");
const currPalettes = document.querySelector(".user-data-palettes");
const paletteBtn = document.querySelector(".user-paletes");
const scrollPalette = document.querySelector(".scroll-palettes");
let chosenColor = 0;
window.addEventListener("load", () => {
    if (localStorage.getItem("color-palete") === null) {
        localStorage.setItem("color-palete", "[]");
    }
    else if (localStorage.getItem("user-projects") === null) {
        localStorage.setItem("user-projects", "[]");
    }
    else
        return;
});
for (let i = 0; i < palateColors.length; i++) {
    palateColors[i].addEventListener("click", () => {
        for (let k = 0; k < palateColors.length; k++) {
            palateColors[k].className = "choose-color";
        }
        palateColors[i].className = "choose-color chosen";
        chosenColor = i;
    });
}
paletteBtn.addEventListener("click", () => {
    currPalettes.classList.toggle("hidden");
    const currPalettesStorage = JSON.parse(localStorage.getItem("color-palete"));
    scrollPalette.innerHTML = "";
    for (let i = 0; i < currPalettesStorage.length; i++) {
        const userPalette = document.createElement("div");
        const Ptext = document.createElement("div");
        const user_colors = document.createElement("div");
        userPalette.className = "user-palette";
        user_colors.className = "user-colors";
        Ptext.className = "Ptext";
        Ptext.innerHTML = currPalettesStorage[i].name;
        userPalette.appendChild(Ptext);
        currPalettesStorage[i].color_palete.forEach((color) => {
            const each_color = `<span class="colors" style="background: ${color}"></span>`;
            const colorNode = document
                .createRange()
                .createContextualFragment(each_color);
            user_colors.appendChild(colorNode);
        });
        userPalette.appendChild(user_colors);
        userPalette.addEventListener("click", () => {
            const chosenColorForUser = currPalettesStorage[i].color_palete;
            eachColor.forEach((items, c) => {
                items.style.background = chosenColorForUser[c];
            });
        });
        scrollPalette.appendChild(userPalette);
    }
});
colorChooser.addEventListener("input", () => {
    palateColors[chosenColor].style.background = colorChooser.value;
});
createColorBtn.addEventListener("click", () => {
    openSettingOne.classList.toggle("hidden");
});
palleteCancel.addEventListener("click", () => {
    openSettingOne.classList.toggle("hidden");
});
palleteSave.addEventListener("click", () => {
    let accept = false;
    for (let i = 0; i < palateColors.length; i++) {
        if (!palateColors[i].style.background) {
            alert("please make sure all empty section is'nt empty");
            break;
        }
        else if (!paleteName.value.trim()) {
            alert("fill the palete name field");
            break;
        }
        else
            accept = true;
    }
    if (accept) {
        const oldColors = JSON.parse(localStorage.getItem("color-palete"));
        const newOnes = {
            name: paleteName.value,
            color_palete: [],
        };
        for (let i = 0; i < palateColors.length; i++) {
            newOnes.color_palete.push(palateColors[i].style.background);
        }
        let combine = [...oldColors, newOnes];
        localStorage.setItem("color-palete", JSON.stringify(combine));
        openSettingOne.classList.toggle("hidden");
    }
});
hambugerMenu.addEventListener("click", () => {
    hambugerMenu.classList.toggle("open");
    menu.classList.toggle("slide");
});
const mosueCursor = document.querySelector(".cursor");
const userSettings = {
    color: "black",
    thick: 2,
};
document.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;
    mosueCursor.setAttribute("style", `left: ${x}px; top: ${y}px`);
    mosueCursor.style.width = `${userSettings.thick}px`;
    mosueCursor.style.height = `${userSettings.thick}px`;
});
const start = parseFloat(rangeInput.min);
const end = parseFloat(rangeInput.max);
const step = parseFloat(rangeInput.step);
for (let i = start; i <= end; i += step) {
    rangeValue.innerHTML += `<div>${i}</div>`;
}
const range = document.querySelector(".range");
rangeInput.addEventListener("input", () => {
    let top = (parseFloat(rangeInput.value) / step) * -40;
    rangeValue.style.marginTop = `${top}px`;
});
let cStep = -1;
let cPushArray = new Array();
const colors = [
    "#FF2929",
    "#F8FF29",
    "#29FF54",
    "#6129FF",
    "#FF2994",
    "#29FFF8",
    "#FF9900",
    "#8B4513",
    "#670192",
    "#3BFF86",
    "#FF77A4",
    "#206D67",
    "#000",
];
const eachColor = document.querySelectorAll(".color");
eachColor.forEach((items, i) => {
    items.style.background = colors[i];
});
const eraser = document.querySelector(".eraser");
eraser.addEventListener("click", () => {
    userSettings.color = "#FFF";
});
function Painting() {
    this.declareColor = () => {
        eachColor.forEach((element) => {
            element.addEventListener("click", () => {
                for (let i = 0; i < eachColor.length; i++) {
                    eachColor[i].classList.remove("active");
                }
                element.classList.add("active");
                userSettings.color = element.style.background;
            });
        });
    };
    this.declareThick = () => {
        range.addEventListener("input", () => {
            userSettings.thick = Number(range.value);
        });
    };
}
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
const drawImage = () => {
    let image = new Image();
    image.src = "../../assets/white.jpg";
    image.onload = () => {
        if (ctx) {
            ctx.drawImage(image, 0, 0, innerWidth, innerHeight);
        }
        cPush();
    };
};
drawImage();
const clear = document.querySelector(".clear");
clear.addEventListener("click", () => {
    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    drawImage();
});
let painting = false;
const startPosition = (e) => {
    painting = true;
    draw(e);
};
const endPosition = (e) => {
    painting = false;
    ctx.beginPath();
    cPush();
};
const updateSettings = new Painting();
updateSettings.declareColor();
updateSettings.declareThick();
const draw = (e) => {
    if (!painting)
        return;
    if (ctx) {
        ctx.lineWidth = userSettings.thick;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = userSettings.color;
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }
};
const mouseLeave = (e) => {
    if (painting) {
        painting = false;
        cPush();
    }
};
const cPush = () => {
    cStep++;
    if (cStep < cPushArray.length) {
        cPushArray.length = cStep;
    }
    cPushArray.push(document.querySelector("canvas").toDataURL());
};
const Redo = () => {
    if (cStep < cPushArray.length - 1) {
        cStep++;
        const canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = function () {
            if (ctx) {
                ctx.drawImage(canvasPic, 0, 0);
            }
        };
    }
};
const Undo = () => {
    if (cStep > 0) {
        cStep--;
        const canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = function () {
            ctx.drawImage(canvasPic, 0, 0);
        };
    }
};
window.addEventListener("mousedown", startPosition);
window.addEventListener("mouseup", endPosition);
window.addEventListener("mousemove", draw);
window.addEventListener("mouseleave", mouseLeave);
window.addEventListener("keyup", (e) => {
    if (e.keyCode === 90) {
        Undo();
    }
    if (e.keyCode === 88) {
        Redo();
    }
});
