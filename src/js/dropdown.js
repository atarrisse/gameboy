export default function initDropdown(pubsub, id) {
  const dropdown = document.getElementById(id);
  const dropdownOptionsList = dropdown.getElementsByClassName(
    "dropdown__options"
  )[0];
  const dropdownOptions = [...document.getElementsByClassName("dropdown__opt")];

  const activateOption = labelEl => {
    const id = labelEl.getAttribute("for");
    labelEl.classList.add("dropdown__opt--active");
    labelEl.querySelector(`#${id}`).checked = true;
    pubsub.publish("gameboy selected", {
      dropdownOptIndex: dropdownOptions.indexOf(labelEl)
    });
  };

  const deactivateOption = labelEl => {
    const id = labelEl.getAttribute("for");
    labelEl.classList.remove("dropdown__opt--active");
    labelEl.querySelector(`#${id}`).checked = false;
  };

  dropdown.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();
    dropdownOptionsList.classList.toggle("dropdown__options--active");
    const isOpen = dropdownOptionsList.classList.contains(
      "dropdown__options--active"
    );

    if (!isOpen) {
      dropdownOptions.forEach(opt => deactivateOption(opt));
      activateOption(e.target);
    }
  });
}
