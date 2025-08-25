import Throttle from "./throttle";

export default function themeSwitcher() {
  const moonButton = document.querySelector<HTMLElement>(".moon-block");

  const sunButton = document.querySelector<HTMLElement>(".sun-block");

  let currentTheme = document.documentElement.getAttribute("data-theme");

  const throttle = new Throttle(400);

  if (sunButton && moonButton) {
    sunButton.addEventListener("click", () => {
      if (currentTheme === "dark" && throttle.isReady()) {
        localStorage.setItem("theme", "light");
        document.documentElement.setAttribute("data-theme", "light");
        currentTheme = document.documentElement.getAttribute("data-theme");
        throttle.triggerChoke();
      }
    });
    moonButton.addEventListener("click", () => {
      if (currentTheme === "light" && throttle.isReady()) {
        localStorage.setItem("theme", "dark");
        document.documentElement.setAttribute("data-theme", "dark");
        currentTheme = document.documentElement.getAttribute("data-theme");
        throttle.triggerChoke();
      }
    });
  }
}
