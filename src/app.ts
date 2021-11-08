const rangeInput = document.querySelector(".range-input input") as HTMLInputElement;
const rangeValue = document.querySelector(".range-input .value div") as HTMLDivElement;
const hambugerMenu = document.querySelector("#nav-icon3") as HTMLDivElement;
const menu = document.querySelector(".side-menu") as HTMLDivElement;
const palleteCancel = document.querySelector(".Cancel") as HTMLButtonElement;
const palleteSave = document.querySelector(".Save") as HTMLButtonElement;
const colorChooser = document.querySelector(".color-chooser") as HTMLInputElement;
const palateColors = document.querySelectorAll<HTMLSpanElement>(".choose-color");
const createColorBtn = document.querySelector(".createColor-btn") as HTMLButtonElement;
const openSettingOne = document.querySelector(".color-pallete-container") as HTMLDivElement;
const paleteName = document.querySelector(".input-name") as HTMLInputElement;
const currPalettes = document.querySelector(".user-data-palettes") as HTMLDivElement;
const paletteBtn = document.querySelector(".user-paletes") as HTMLButtonElement;
const scrollPalette = document.querySelector(".scroll-palettes") as HTMLDivElement;
const saveWork = document.querySelector('.save-work') as HTMLButtonElement;
const saveWorkContainer = document.querySelector('.save-work-background') as HTMLDivElement;
const cancelWorkspace = document.querySelector('.cancel-workspace') as HTMLButtonElement;
const saveWorkspace = document.querySelector('.save-workspace') as HTMLButtonElement
const projectNameInput = document.querySelector('.project-namee') as HTMLInputElement 

let chosenColor: number = 0;
interface colorPlatesProps {
  name: string;
  color_palete: string[];
}
interface useProjectsProps {
  name: string;
  imageHash: string;
}

window.addEventListener("load", () => {
  if (localStorage.getItem("color-palete") === null) {
    localStorage.setItem("color-palete", "[]");
  } else if (localStorage.getItem("user-projects") === null) {
    localStorage.setItem("user-projects", "[]");
  } else return
});

for (let i = 0; i < palateColors.length; i++) {
  palateColors[i].addEventListener("click", () => {
    for (let k = 0; k < palateColors.length; k++) {
      palateColors[k].className = "choose-color";
    }

    palateColors[i].className = "choose-color chosen" as string
    chosenColor = i;
  });
}

paletteBtn.addEventListener("click", () => {
  currPalettes.classList.toggle("hidden");
  const currPalettesStorage: colorPlatesProps[] | null = JSON.parse(
    localStorage.getItem("color-palete")!
  );
  scrollPalette.innerHTML = "";

  for (let i = 0; i < currPalettesStorage!.length; i++) {
    const userPalette: HTMLDivElement = document.createElement("div");
    const Ptext: HTMLDivElement = document.createElement("div");
    const user_colors: HTMLDivElement = document.createElement("div");

    userPalette.className = "user-palette";
    const deletePalette = document.createElement("button") as HTMLButtonElement
    deletePalette.className = "delete-palette" as string
    deletePalette.innerHTML = "Remove" as string
    userPalette.appendChild(deletePalette)
    user_colors.className = "user-colors";
    Ptext.className = "Ptext";
    Ptext.innerHTML = currPalettesStorage![i].name;
    userPalette.appendChild(Ptext);

    currPalettesStorage![i].color_palete.forEach((color) => {
      const each_color: string = `<span class="colors" style="background: ${color}"></span>`;
      const colorNode: DocumentFragment = document
        .createRange()
        .createContextualFragment(each_color);

      user_colors.appendChild(colorNode);
    });

    userPalette.appendChild(user_colors);

    userPalette.addEventListener("click", () => {
      const chosenColorForUser: string[] = currPalettesStorage![i].color_palete

      eachColor.forEach((items: HTMLSpanElement, c: number) => {
        items.style.background = chosenColorForUser[c];
      });
    })

    scrollPalette.appendChild(userPalette);
  }
});

saveWork.addEventListener("click", () => {
  saveWorkContainer.classList.toggle("hidden")
  menu.classList.toggle("slide");
  hambugerMenu.classList.toggle("open");
})

cancelWorkspace.addEventListener("click", () => {
  saveWorkContainer.classList.toggle("hidden")
})

colorChooser.addEventListener("input", () => {
  palateColors[chosenColor].style.background = colorChooser.value;
});

createColorBtn.addEventListener("click", () => {
  openSettingOne.classList.toggle("hidden");
  menu.classList.toggle("slide");
  hambugerMenu.classList.toggle("open");
  
});

palleteCancel.addEventListener("click", () => {
  openSettingOne.classList.toggle("hidden");
});

palleteSave.addEventListener("click", () => {
  let accept: boolean = false;

  for (let i = 0; i < palateColors.length; i++) {
    if (!palateColors[i].style.background) {
      alert("please make sure all empty section is'nt empty");
      break;
    } else if (!paleteName.value.trim()) {
      alert("fill the palete name field");
      break;
    } else accept = true;
  }

  if (accept) {
    const oldColors = JSON.parse(localStorage.getItem("color-palete")!);

    const newOnes: colorPlatesProps = {
      name: paleteName.value,
      color_palete: [],
    };

    for (let i = 0; i < palateColors.length; i++) {
      newOnes.color_palete.push(palateColors[i].style.background);
    }

    let combine: colorPlatesProps[] = [...oldColors, newOnes]
    localStorage.setItem("color-palete", JSON.stringify(combine));
    openSettingOne.classList.toggle("hidden");
  }
});

hambugerMenu.addEventListener("click", () => {
  hambugerMenu.classList.toggle("open");
  menu.classList.toggle("slide");
});

saveWorkspace.addEventListener("click", () => {
  const oldSaveProject = JSON.parse(localStorage.getItem("user-projects")!)
  const readySave: useProjectsProps = {name: "", imageHash: ""}

  if(!projectNameInput.value.trim()){
    alert("fill the Project Name")
  }else {
    readySave.name = projectNameInput.value
    readySave.imageHash = canvas!.toDataURL()
  }

  const setProject: useProjectsProps[] = [...oldSaveProject, readySave]
  localStorage.setItem("user-projects", JSON.stringify(setProject))

  projectNameInput.value = ""
  saveWorkContainer.classList.toggle("hidden")
  alert("Your Project Saved")
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

const cancelProjectBtn = document.querySelector(".cancelProject-btn") as HTMLButtonElement;
const loadProjectBtn = document.querySelector(".loadProject-btn") as HTMLButtonElement;
const openProjectsBtn = document.querySelector(".load-project") as HTMLButtonElement;
const loadStuffBG = document.querySelector(".load-stuff-background") as  HTMLDivElement
const projectList = document.querySelector(".user-project-list") as HTMLDivElement

let chosenProject: string = ""

openProjectsBtn.addEventListener("click", () => {
  projectList.innerHTML = ""
  loadStuffBG.classList.toggle("hidden")
  menu.classList.toggle("slide");
  hambugerMenu.classList.toggle("open");

  let projectStorage: useProjectsProps[] | null = JSON.parse(localStorage.getItem("user-projects")!)

  if(projectStorage!.length !== 0){
    for(let i = 0; i < projectStorage!.length; i++){
      const eachProject: HTMLDivElement = document.createElement("div"); 
      eachProject.className = "each-project"; 

      const deleteBtn = document.createElement("button") as HTMLButtonElement;
      deleteBtn.innerHTML = "delete"
      deleteBtn.className = 'delete-btn'

      eachProject.appendChild(deleteBtn)
      const title = document.createElement("div"); 
      title.className = "title"; 
      title.innerHTML = projectStorage![i].name
      eachProject.appendChild(title); 

      const canvasContainer = document.createElement("div"); 
      canvasContainer.className = "canvas-container"; 
      const previewCanvas = document.createElement("canvas")
      previewCanvas.className = "preview"
      
      const previewCtx = previewCanvas.getContext('2d')
      const previewImg: HTMLImageElement = new Image()
      previewImg.src = projectStorage![i].imageHash

      previewImg.onload = () => {
        previewCtx!.drawImage(previewImg, 0, 0);
      }

      canvasContainer.appendChild(previewCanvas)
      eachProject.appendChild(canvasContainer)
      projectList.appendChild(eachProject)

      eachProject.addEventListener("click", () => {
        const allPRoject = document.querySelectorAll<HTMLDivElement>(".each-project")

        for(let k = 0; k < allPRoject.length; k++){
          allPRoject[k].className = "each-project"
        }

        eachProject.classList.toggle("chosen")
        chosenProject = projectStorage![i].imageHash
      
        deleteBtn.addEventListener("click", () => {
          let index: string = projectStorage![i].name

         const deletedProject: useProjectsProps[] = projectStorage?.filter(e => e.name !== index)!
         localStorage.setItem("user-projects", JSON.stringify(deletedProject))
         menu.classList.toggle("slide");
         loadStuffBG.classList.toggle("hidden")
         hambugerMenu.classList.toggle("open");
         alert(`Project ${index} deleted Succesfuly`)
        }, {once: true})
      })
    }
  }
})

loadProjectBtn.addEventListener('click', () => {
  const ctxImage: HTMLImageElement = new Image();
  ctxImage.src = chosenProject as string

  ctx!.clearRect(0, 0, innerWidth, innerHeight)
  ctx!.drawImage(ctxImage, 0, 0)
  loadStuffBG.classList.toggle("hidden")
})

cancelProjectBtn.addEventListener("click", () => {
  loadStuffBG.classList.toggle("hidden")
})


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

const range = document.querySelector(".range") as HTMLInputElement;

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
const ctx = canvas!.getContext("2d");

canvas!.width = innerWidth;
canvas!.height = innerHeight;

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

const clear = document.querySelector(".clear") as HTMLDivElement;
clear.addEventListener("click", () => {
  if (ctx) {
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

const updateSettings = new (Painting as any)();
updateSettings.declareColor();
updateSettings.declareThick();

const draw = (e: MouseEvent) => {
  if (!painting) return;
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
  cPushArray.push(canvas!.toDataURL());
};

const Redo = () => {
  if (cStep < cPushArray.length - 1) {
    cStep++;
    const canvasPic = new Image();
    canvasPic.src = cPushArray[cStep];
    canvasPic.onload = () => {
      if (ctx) {
        ctx.drawImage(canvasPic, 0, 0);
      }
    };
  }
};

const Undo = () => {
  if (cStep > 0) {
    cStep--;
    const canvasPic: HTMLImageElement = new Image();
    canvasPic.src = cPushArray[cStep] as string
    canvasPic.onload = () => {
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
