import createAccordion, { setAccordionInteraction } from "./accordion";

export default function initInformation(pubsub) {
  const informationEl = document.getElementById("information");
  const informationTemplate = document.getElementById("information-template");

  const addInformation = data => {
    const clone = document.importNode(informationTemplate.content, true);
    const informationContent = clone.querySelector("#information-title");
    informationContent.innerHTML = `Game Boy ${data.name},<br/>${
      data.description
    }`;
    createAccordion(clone, data);
    informationEl.append(clone);
  };

  const removeInformation = () => {
    informationEl.innerHTML = "";
  };

  const switchInformation = dropdownOptIndex => {
    removeInformation();
    addInformation(window.data[dropdownOptIndex]);
  };

  pubsub.subscribe("gameboy selected", ({ dropdownOptIndex = 0 }) => {
    switchInformation(dropdownOptIndex);
  });

  informationEl.addEventListener("click", e => {
    setAccordionInteraction(e.target);
  });

  addInformation(window.data[0]);
}
