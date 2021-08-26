const rangeInput = document.querySelector(".range-input input") as HTMLInputElement;
const rangeValue = document.querySelector(".range-input .value div") as HTMLDivElement;

const mosueCursor = document.querySelector(".cursor") as HTMLDivElement;
interface userSettingsInterface<T> {
  color: string;
  thick: T;
}
const userSettings: userSettingsInterface<number> = {
  color: "black",
  thick: 2,
};

document.addEventListener("mousemove", (e: MouseEvent) => {
  const x: number = e.clientX;
  const y: number = e.clientY;

  mosueCursor.setAttribute("style", `left: ${x}px; top: ${y}px`);
  mosueCursor.style.width = `${userSettings.thick}px`;
  mosueCursor.style.height = `${userSettings.thick}px`;
});

const start: number = parseFloat(rangeInput.min);
const end: number = parseFloat(rangeInput.max);
const step: number = parseFloat(rangeInput.step);

for (let i = start; i <= end; i += step) {
  rangeValue.innerHTML += `<div>${i}</div>`;
}

const range = document.querySelector("input") as HTMLInputElement;

rangeInput.addEventListener("input", () => {
  let top: number = (parseFloat(rangeInput.value) / step) * -40;
  rangeValue.style.marginTop = `${top}px`;
});

let cStep: number = -1;
let cPushArray: string[] = new Array();

const colors: string[] = ["#FF2929","#F8FF29","#29FF54","#6129FF","#FF2994","#29FFF8","#FF9900","#8B4513","#670192","#3BFF86","#FF77A4","#206D67","#000",];

const eachColor = document.querySelectorAll<HTMLSpanElement>(".color");

eachColor.forEach((items, i) => {
  items.style.background = colors[i];
});

const eraser = document.querySelector(".eraser") as HTMLButtonElement;


eraser.addEventListener("click", () => {
  userSettings.color = "#FFF";
});


function Painting(this: any) {
  this.declareColor = () => {

    eachColor.forEach((element) => {

      element.addEventListener("click", () => {
        for (let i = 0; i < eachColor.length; i++) {
          eachColor[i].classList.remove("active")
        }

        element.classList.add("active")
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
const ctx = canvas!.getContext("2d");

canvas!.width = innerWidth;
canvas!.height = innerHeight;

const drawImage = () => {
  let image = new Image();
  image.src = "../../assets/white.jpg";

  image.onload = () => {
    if(ctx){
        ctx.drawImage(image, 0, 0, innerWidth, innerHeight);
    }
    cPush();
  };
};

drawImage();

const clear = document.querySelector(".clear") as HTMLDivElement;
clear.addEventListener("click", () => {
  if(ctx) {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
  }
  drawImage();
});

let painting: boolean = false;

const startPosition = (e: MouseEvent) => {
  painting = true;
  draw(e);
};

const endPosition = (e: MouseEvent) => {
  painting = false;
  ctx!.beginPath();
  cPush();
};

const updateSettings = new (Painting as any);
updateSettings.declareColor();
updateSettings.declareThick();

const draw = (e: MouseEvent) => {
  if (!painting) return;
  if(ctx){
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

const mouseLeave = (e: MouseEvent) => {
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
  cPushArray.push(document.querySelector("canvas")!.toDataURL());
};

const Redo = () => {
  if (cStep < cPushArray.length - 1) {
    cStep++;
    const canvasPic = new Image();
    canvasPic.src = cPushArray[cStep];
    canvasPic.onload = function () {
      if(ctx){
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
      ctx!.drawImage(canvasPic, 0, 0);
    };
  }
};

window.addEventListener("mousedown", startPosition);
window.addEventListener("mouseup", endPosition);
window.addEventListener("mousemove", draw);
window.addEventListener("mouseleave", mouseLeave);

window.addEventListener("keyup", (e: KeyboardEvent) => {
  if (e.keyCode === 90) {
    Undo();
  }
  if (e.keyCode === 88) {
    Redo();
  }
});