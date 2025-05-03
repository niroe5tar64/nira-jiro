import "../index.css";

import { render } from "solid-js/web";
import { PlaygroundRoot } from "./components/PlaygroundRoot";

const root = document.getElementById("playground-root");
if (root) {
  render(PlaygroundRoot, root);
}
