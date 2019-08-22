export default function initColors(pubsub) {
  const main = document.getElementById("main");
  const colorsList = document.getElementById("color-options");
  const colors = [...colorsList.getElementsByClassName("color-opt__label")];

  const substituteClassList = (element, newClass = "") => {
    element.classList = "";
    element.classList = [...newClass];
  };

  const applyColorFilter = (dropdownOptIndex = 0) => {
    const currentGB = window.data[dropdownOptIndex];
    const colorsToHide = colors.filter(color => {
      const colorValue = color.getAttribute("data-color");
      color.classList.remove("color-opt__label--hide");
      return !currentGB.themes.includes(colorValue);
    });
    colorsToHide.forEach(color =>
      color.classList.add("color-opt__label--hide")
    );
  };

  colorsList.addEventListener("click", e => {
    e.preventDefault();
    const id = e.target.getAttribute("for");
    const input = e.target.querySelector(`#${id}`);
    substituteClassList(main, [`theme-${input.value}`]);
  });

  pubsub.subscribe("gameboy selected", ({ dropdownOptIndex = 0 }) => {
    applyColorFilter(dropdownOptIndex);
  });

  applyColorFilter();
}
