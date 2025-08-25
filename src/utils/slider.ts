const replaceUpPercentage = 105;

import Throttle from "./throttle";

export default function slider() {
  const buttonArray = document.querySelectorAll<HTMLElement>(".slider-button");

  const contentsArray = document.querySelectorAll<HTMLElement>(".slider-block");

  const throttle = new Throttle(250);

  let index = 0;

  buttonArray.forEach((item, index) => {
    item.addEventListener("click", () => {
      slideNavigator(contentsArray, buttonArray, index);
    });
  });

  document.addEventListener("wheel", (e) => {
    console.log(index, Math.sign(e.deltaY));
    console.log(index);
    if (throttle.isReady()) {
      throttle.triggerChoke();
      if (index === 0 && e.deltaY < 0) {
        return;
      } else if (index === 3 && e.deltaY > 0) {
        return;
      } else {
        index = index + Math.sign(e.deltaY);
        slideNavigator(contentsArray, buttonArray, index);
      }
    }
  });
}

function slideNavigator(
  contents: NodeListOf<HTMLElement>,
  buttons: NodeListOf<HTMLElement>,
  index: number
) {
  let currentIndex: number = 0;

  let difference = null;

  contents.forEach((item, index) => {
    if (item.classList.contains("active")) {
      currentIndex = index;
    }
  });

  if (currentIndex !== null) {
    difference = index - currentIndex;

    buttons[currentIndex].classList.remove("active");
    buttons[index].classList.add("active");

    contents[currentIndex].classList.remove("active");
    contents[index].classList.add("active");

    contents.forEach((item) => {
      item.style.transform = `translateY(-${replaceUpPercentage * index}%)`;
    });
  }
}
