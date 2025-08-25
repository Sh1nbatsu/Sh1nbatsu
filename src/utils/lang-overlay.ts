import triggerScroll from "./lang-charset";

export default async function animateOverlay(
  lang: string,
  langScrollItems: NodeList
) {
  const overlay = document.querySelector<HTMLElement>(".overlay");

  if (overlay) {
    overlay.style.pointerEvents = "all";

    setTimeout(() => {
      overlay?.classList.add("visible");
      triggerScroll(langScrollItems, lang);
      overlay?.classList.add("animate-out");
    }, 200);

    overlay?.addEventListener("animationend", () => {
      overlay.classList.remove("animate-out");
      overlay.classList.remove("visible");
      overlay.style.pointerEvents = "none";
    });
  }
}
