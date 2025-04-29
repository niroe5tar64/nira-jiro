import { render } from "solid-js/web";
import { PopupApp } from "~/components";

const root = document.getElementById("popup-root");
if (root) {
  render(PopupApp, root);
}
