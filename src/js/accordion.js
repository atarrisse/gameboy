export default function createAccordion(clone, data) {
  const accordionItemTemplate = document.getElementById("accordion-item");
  const informationAccordion = clone.querySelector("#information-accordion");

  const setAccordionBtn = ({ clone, data, index }) => {
    const accordionItemBtn = clone.querySelector("button");
    accordionItemBtn.textContent = data.title;
    accordionItemBtn.setAttribute("aria-controls", `content-${index}`);
    accordionItemBtn.setAttribute("aria-hidden", true);
    accordionItemBtn.setAttribute("aria-expanded", false);
    accordionItemBtn.setAttribute("id", `accordion-control-${index}`);
    accordionItemBtn.setAttribute("data-index", index);
    accordionItemBtn.classList.add("accordion-button");
  };

  const setAccordionDiv = ({ clone, data, index }) => {
    const accordionItemDiv = clone.querySelector("div");
    accordionItemDiv.setAttribute("id", `content-${index}`);
    accordionItemDiv.classList.add("accordion-content");
    data.content.forEach(content => {
      const pEl = document.createElement("p");
      const pText = document.createTextNode(content);
      pEl.appendChild(pText);
      accordionItemDiv.appendChild(pEl);
    });
  };

  const createAccordionItem = (data, index) => {
    const clone = document.importNode(accordionItemTemplate.content, true);
    const params = { clone, data, index };
    setAccordionBtn(params);
    setAccordionDiv(params);
    return clone;
  };

  data.informations.forEach((info, index) => {
    const item = createAccordionItem(info, index);
    informationAccordion.append(item);
  });

  return informationAccordion;
}

export function setAccordionInteraction(button) {
  if (button.matches(".accordion-button")) {
    const buttonControls = button.getAttribute("aria-controls");
    const content = document.getElementById(buttonControls);

    const isAriaExpanded = Boolean(
      button.getAttribute("aria-expanded") === "true"
    );
    const isAriaHidden = Boolean(button.getAttribute("aria-hidden") === "true");
    button.setAttribute("aria-expanded", `${!isAriaExpanded}`);

    if (isAriaHidden) {
      content.classList.add("accordion-content--show");
      button.setAttribute("aria-hidden", false);
    } else {
      content.classList.remove("accordion-content--show");
      button.setAttribute("aria-hidden", true);
    }
  }
}
