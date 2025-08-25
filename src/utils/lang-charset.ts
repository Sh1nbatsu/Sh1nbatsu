const engAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const en = "English";

const ru = "Russian";

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

function scrollAlphabet(
  scrollAmount: number,
  firstChar: string,
  lastChar: string
) {
  const charArr: string[] = [];

  const currArr = engAlphabet.replace(firstChar + lastChar, "");

  for (let i = 0; i < scrollAmount - 2; i++) {
    charArr.push(currArr[getRandomInt(engAlphabet.length)].toLocaleLowerCase());
  }

  charArr.push(lastChar);
  charArr.unshift(firstChar);
  return charArr;
}

function scrollElement(element: Node, charArr: string[]) {
  let index = 0;

  const scroller = () => {
    element.textContent = charArr[index];
    index++;

    if (index >= charArr.length) {
      clearInterval(scrollInterval);
    }
  };

  const scrollInterval = setInterval(scroller, 200);
}

export function triggerScroll(
  elementsToScroll: NodeList,
  langToScroll: string
) {
  const completeCharSet: string[][] = [];

  if (langToScroll === ru) {
    elementsToScroll.forEach((_, index: number) => {
      completeCharSet.push(scrollAlphabet(8, ru[index], en[index]));
    });
  } else if (langToScroll === en) {
    elementsToScroll.forEach((_, index: number) => {
      completeCharSet.push(scrollAlphabet(8, en[index], ru[index]));
    });
  }

  completeCharSet[0] = completeCharSet[0].map((item) => {
    return item.toUpperCase();
  });

  console.log(completeCharSet);

  elementsToScroll.forEach((item, index) => {
    setTimeout(() => {
      scrollElement(item, completeCharSet[index]);
    }, index * 200);
  });
}

export default triggerScroll;
