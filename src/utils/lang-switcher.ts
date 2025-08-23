// Безумное спагетти, но я не собираюсь добавлять больше двух языков, да и для этого нужно было бы перерабатывать верстку и стили полностью
import animateOverlay from "./lang-overlay";

const langScrollItems = document.querySelectorAll<HTMLElement>(
  "[data-spec='lang-scroll']"
);

export default function langSwitcher() {
  const ruItem = document.querySelector<HTMLElement>(
    "div [data-lang='ru']"
  ) as HTMLElement;

  const enItem = document.querySelector<HTMLElement>(
    "div [data-lang='en']"
  ) as HTMLElement;

  const langSwitcher = document.querySelector<HTMLElement>(".lang-switcher");

  let currentLang = document.body.getAttribute("data-lang");

  const langItems = [ruItem, enItem];

  let isOpen = false;

  langItems.forEach((item) => {
    if (item.getAttribute("data-lang") !== currentLang) {
      item.style.zIndex = "-1";
      item.classList.add("lang-item_hidden");
    } else {
      item.classList.remove("lang-item_hidden");
    }
  });

  if (langItems && langSwitcher && currentLang) {
    langItems.forEach((item) => {
      item.addEventListener("click", () => {
        const dataLang = item.getAttribute("data-lang");
        if (!isOpen) {
          langOpen();
        } else if (currentLang === dataLang && isOpen) {
          langClose();
        } else if (currentLang !== dataLang && isOpen) {
          langChange();
        }
      });
    });

    const langOpen = () => {
      langSwitcher.classList.remove("animate-close");
      langSwitcher.classList.add("animate-open");
      isOpen = true;
    };
    const langClose = () => {
      langSwitcher.classList.remove("animate-open");
      langSwitcher.classList.add("animate-close");
      isOpen = false;
    };

    const animationTrigger = (toChange: Element) => {
      let lang = "";
      if (toChange.getAttribute("data-lang") === "en") {
        lang = "Russian";
        langScrollItems.forEach((item, index) => {
          item.textContent = lang[index];
          console.log(item, lang[index - 1]);
        });
      } else if (toChange.getAttribute("data-lang") === "ru") {
        lang = "English";
        langScrollItems.forEach((item, index) => {
          item.textContent = lang[index];
          console.log(item, lang[index]);
        });
      }
      animateOverlay(lang, langScrollItems);
    };

    const langChange = () => {
      const toChange = langItems.find((item) => {
        if (item?.getAttribute("data-lang") !== currentLang) {
          return item;
        }
      });

      const toBeChanged = langItems.find((item) => {
        return item !== toChange;
      });

      console.log(toChange, typeof toChange);

      if (toChange && toBeChanged) {
        toChange.style.zIndex = "1";
        toBeChanged.style.zIndex = "-1";
        document.body.setAttribute(
          "data-lang",
          `${toChange.getAttribute("data-lang")}`
        );
        currentLang = toChange.getAttribute("data-lang");
        langClose();
        setTimeout(() => {
          toChange.classList.remove("lang-item_hidden");
          toBeChanged.classList.add("lang-item_hidden");
          animationTrigger(toChange);
        }, 200);
      }
    };
  }
}
