export default function initialAnimaion() {
  const initialBlock = document.querySelector<HTMLElement>(".initial");
  setTimeout(() => {
    if (initialBlock) {
      initialBlock.classList.add("fade-out");
      localStorage.setItem("initialAnimation", "true");
    }
  }, 2000);

  initialBlock?.addEventListener(
    "transitionend",
    () => {
      initialBlock.style.display = "none";
      localStorage.setItem("animationPlayed", "true");
    },
    { once: true }
  );
}
