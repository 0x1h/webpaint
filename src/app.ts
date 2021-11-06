const rangeInput = document.querySelector(".range-input input") as HTMLInputElement;
const rangeValue = document.querySelector(".range-input .value div") as HTMLDivElement;
const hambugerMenu = document.querySelector("#nav-icon3") as HTMLDivElement;
const menu = document.querySelector(".side-menu") as HTMLDivElement;
const palleteCancel = document.querySelector(".Cancel") as HTMLButtonElement;
const palleteSave = document.querySelector(".Save") as HTMLButtonElement;
const colorChooser = document.querySelector(".color-chooser") as HTMLInputElement;
const palateColors =  document.querySelectorAll<HTMLSpanElement>(".choose-color")
const createColorBtn = document.querySelector(".createColor-btn") as HTMLButtonElement;
const openSettingOne = document.querySelector(".color-pallete-container") as HTMLDivElement;
const paleteName = document.querySelector(".input-name") as HTMLInputElement;

let chosenColor: number = 0;

interface colorPlatesProps {
  name: string;
  color_palete: string[]
}
interface useProjectsProps {
  name: string;
  imageHash: string;
}

window.addEventListener("load", () => {
  const storagePaletes: colorPlatesProps[] | null = JSON.parse(localStorage.getItem("color-paletes")!)
  const storageProjects: useProjectsProps[] | null = JSON.parse(localStorage.getItem("user-projects")!)

  if(!storagePaletes){
    localStorage.setItem("color-palete", "[]")
  }else if(!storageProjects){
    localStorage.setItem("user-projects", "[]")
  }
})

for(let i = 0; i < palateColors.length; i++) {
 palateColors[i].addEventListener("click", () => {
  for(let k = 0; k < palateColors.length; k++){
    palateColors[k].className = "choose-color"
  }

  palateColors[i].className = "choose-color chosen"
  chosenColor = i
 })
}

colorChooser.addEventListener("input", () => {
  palateColors[chosenColor].style.background = colorChooser.value
})

createColorBtn.addEventListener("click", () => {
  openSettingOne.classList.toggle("hidden")
})

palleteCancel.addEventListener("click", () => {
  openSettingOne.classList.toggle("hidden")
})

console.log(JSON.parse(localStorage.getItem("color-palete")!))

palleteSave.addEventListener('click', () => {
  let accept: boolean = false
  
  for(let i = 0; i < palateColors.length; i++) {
    if(!palateColors[i].style.background){
      alert("please make sure all empty section is'nt empty")
      break
    }else if(!paleteName.value.trim()){
      alert("fill the palete name field")
      break
    }else accept = true
  }

  if(accept){
    const oldColors = JSON.parse(localStorage.getItem("color-palete")!)
    
    const newOnes: colorPlatesProps = {
      name: paleteName.value,
      color_palete: []
    } 

    for(let i = 0; i < palateColors.length; i++) {
      newOnes.color_palete.push(palateColors[i].style.background)
    }

    const combine: colorPlatesProps[] = [...oldColors, newOnes]
    
    console.log(...oldColors)

    localStorage.setItem("color-palete", JSON.stringify(combine))
  }
})

hambugerMenu.addEventListener("click", () => {
  hambugerMenu.classList.toggle("open")
  menu.classList.toggle("slide")
})

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