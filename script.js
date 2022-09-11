const pallets = document.querySelectorAll(".box");
const pop = document.querySelector(".pop");
pop.addEventListener("click", () => {
  window.location.reload();
});
let colors = [
  "red",
  "green",
  "blue",
  "yellow",
  "purple",
  "brown",
  "orange",
  "skyblue",
];
let selectedColors = [];
colors = [...colors, ...colors];
let selected = null;
let block = true;
let attempt = 0;
let correct = 0;
function randomColor() {
  let random = Math.floor(Math.random() * colors.length);
  const color = colors[random];
  colors.splice(random, 1);
  return color;
}

pallets.forEach((pallet) => {
  color = randomColor();
  pallet.classList.add(color);
  pallet.setAttribute("data-color", color);
  pallet.addEventListener("click", handlePalletClick);
});

async function start(){
    let targets = [...pallets];
    while(targets.length){
        const random = Math.floor(Math.random() * targets.length);
        const target = targets[random];
        targets = targets.filter((item) => item !== target);
        target.classList.remove("hide-color");
        await new Promise((resolve) => setTimeout(resolve,250));
        target.classList.add("hide-color");
    }
    block = false;
}
start();

async function handlePalletClick({ target }) {
    const color = target.getAttribute("data-color");
    console.log(color,selectedColors);
  if (block || target === selected || selectedColors.includes(color)) return;
  block = true;
  target.classList.remove("hide-color");
  if (!selected) {
    selected = target;
    block = false;
  } else {
    attempt++;
    selectedColor = selected.getAttribute("data-color");
    if (selectedColor !== color) {
      await new Promise((resolve) =>
        setTimeout(() => {
          selected.classList.add("hide-color");
          target.classList.add("hide-color");
          resolve();
        }, 500)
      );
    } else {
      correct++;
      selectedColors.push(selectedColor);
      if (correct === 8) {
        pop.innerHTML = `You Won in ${attempt} attempts`;
        pop.classList.remove("hide");
      }
    }
    block = false;
    selected = null;
  }
}
