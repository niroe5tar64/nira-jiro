// import { MarkdownTool } from "./MarkdownTool";
import { MarkdownTool } from "./MarkdownTool";
import { TemplateTool } from "./TemplateTool";
import "./aui.css";

export function AdditionalTools() {
  return (
    <div class="aui-buttons wiki-edit-toolbar-section additional-tool">
      <MarkdownTool />
      {/* <TemplateTool /> */}
    </div>
  );
}
