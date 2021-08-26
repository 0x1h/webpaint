"use strict";
const rangeInput = document.querySelector(".range-input input");
const rangeValue = document.querySelector(".range-input .value div");
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
const range = document.querySelector("input");
rangeInput.addEventListener("input", () => {
    let top = (parseFloat(rangeInput.value) / step) * -40;
    rangeValue.style.marginTop = `${top}px`;
});
let cStep = -1;
let cPushArray = new Array();
const colors = ["#FF2929", "#F8FF29", "#29FF54", "#6129FF", "#FF2994", "#29FFF8", "#FF9900", "#8B4513", "#670192", "#3BFF86", "#FF77A4", "#206D67", "#000",];
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
const updateSettings = new Painting;
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
