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
colors = [...colors, ...colors];
let selected = null;
let block = false;
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

async function handlePalletClick({ target }) {
  if (block || target === selected) return;
  block = true;
  const color = target.getAttribute("data-color");
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
      if (correct === 8) {
        pop.innerHTML = `You Won in ${attempt} attempts`;
        pop.classList.remove("hide");
      }
    }
    block = false;
    selected = null;
  }
}
