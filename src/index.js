import styles from "./index.scss";
import initInformation from "./js/information";
import initDropdown from "./js/dropdown";
import initColors from "./js/color-options";
import initBtnFilter from "./js/btn-filter";
import PubSub from "./js/pubsub";
import jsonData from "./data/data.json";

window.data = jsonData.products;

document.addEventListener("DOMContentLoaded", event => {
  const pubsub = new PubSub();

  initDropdown(pubsub, "dropdown-gb");
  initColors(pubsub);
  initBtnFilter("btn-filter", "filters");
  initInformation(pubsub);
});
