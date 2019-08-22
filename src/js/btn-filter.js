export default function initBtnFilter(btnId, filterId) {
  const filterBtn = document.getElementById(btnId);
  const filters = document.getElementById(filterId);

  filterBtn.addEventListener("click", () => {
    filterBtn.classList.toggle("btn__filter--active");
    filters.classList.toggle("filters--active");
  });
}
