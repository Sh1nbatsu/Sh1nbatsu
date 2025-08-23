import ClickChoke from "./click-choke";

export default function themeSwitcher() {
  const moonButton = document.querySelector<HTMLElement>(".moon-block");

  const sunButton = document.querySelector<HTMLElement>(".sun-block");

  let currentTheme = document.documentElement.getAttribute("data-theme");

  const clickChoker = new ClickChoke(300);

  if (sunButton && moonButton) {
    sunButton.addEventListener("click", () => {
      if (currentTheme === "dark" && clickChoker.isReady()) {
        localStorage.setItem("theme", "light");
        document.documentElement.setAttribute("data-theme", "light");
        currentTheme = document.documentElement.getAttribute("data-theme");
        clickChoker.triggerChoke();
      }
    });
    moonButton.addEventListener("click", () => {
      if (currentTheme === "light" && clickChoker.isReady()) {
        localStorage.setItem("theme", "dark");
        document.documentElement.setAttribute("data-theme", "dark");
        currentTheme = document.documentElement.getAttribute("data-theme");
        clickChoker.triggerChoke();
      }
    });
  }
}
