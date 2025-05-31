import "../index.css";

import { render } from "solid-js/web";
import { OptionsPage } from "~/components";

const root = document.getElementById("options-root");
if (root) {
  render(OptionsPage, root);
}
