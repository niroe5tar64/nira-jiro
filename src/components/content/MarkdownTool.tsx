// import { onCleanup, onMount } from "solid-js";
// import { convertMarkdown, toggleMarkdownFormat } from "~/features";
import { toggleMarkdownFormat } from "~/features";

export function MarkdownTool() {
  // let dropdownTriggerRef: HTMLButtonElement | undefined;

  // const setDropdownTrigger = (el: HTMLButtonElement) => {
  //   dropdownTriggerRef = el;
  // };

  // onMount(() => {
  //   const observer = new MutationObserver((mutations) => {
  //     mutations.map((mutation) => {
  //       if (mutation.type === "attributes" && mutation.attributeName === "class") {
  //         const buttons = dropdownTriggerRef?.parentElement;
  //         const markdownBtn = buttons?.querySelector(".wiki-edit-operation-markdown");
  //         if (!markdownBtn || !dropdownTriggerRef) {
  //           return;
  //         }

  //         dropdownTriggerRef.classList.contains("active")
  //           ? markdownBtn.classList.add("active")
  //           : markdownBtn.classList.remove("active");
  //       }
  //     });
  //   });

  //   if (dropdownTriggerRef) {
  //     observer.observe(dropdownTriggerRef, { attributes: true });
  //   }

  //   onCleanup(() => observer.disconnect());
  // });

  const handleClick = (
    event: MouseEvent,
    callback: (textarea: HTMLTextAreaElement) => void,
  ): void => {
    const target = event.target as HTMLButtonElement;
    const form = target.closest("form");

    const textarea = form?.querySelector("textarea");
    if (!textarea || !(textarea instanceof HTMLTextAreaElement)) {
      console.warn("Textarea not found");
      return;
    }

    try {
      callback(textarea);
      console.info("✅ Markdown変換完了");
    } catch (error) {
      console.error(error);
      alert(`Markdown変換中にエラーが発生しました。\n${error}`);
    }
  };

  return (
    <>
      <button
        type="button"
        class="aui-button aui-button-subtle wiki-edit-operation wiki-edit-operation-markdown"
        onClick={(event) =>
          handleClick(event, (textarea) => {
            const original = textarea.value;
            textarea.value = toggleMarkdownFormat(original);
          })
        }
      >
        <span>MD</span>
      </button>

      {/* <button
        ref={setDropdownTrigger}
        type="button"
        class="aui-button aui-button-subtle aui-dropdown2-trigger wiki-edit-operation-dropdown wiki-edit-markdown-trigger"
        aria-controls="wiki-edit-dropdown"
        aria-haspopup="true"
        data-dropdown-id="wiki-edit-dropdown"
        aria-expanded="false"
        aria-describedby="aui-tooltip"
      >
        <span class="visually-hidden">Markdown 詳細指定</span>
      </button>

      <div
        id="wiki-edit-dropdown"
        class="aui-dropdown2 aui-style-default wiki-edit-dropdown aui-layer aui-alignment-side-bottom aui-alignment-snap-auto"
        style="z-index: 3000; margin: 0px; position: absolute;"
        data-aui-alignment="bottom auto"
        data-aui-alignment-static="true"
        x-placement="bottom-end"
        data-popper-placement="bottom-end"
      >
        <div class="aui-dropdown2-section">
          <ul class="aui-list-truncate">
            <li>
              <button
                type="button"
                class="wiki-edit-operation"
                tabindex="-1"
                onclick={(e) =>
                  handleClick(e, (textarea) => {
                    const original = textarea.value;
                    textarea.value = convertMarkdown({
                      source: original,
                      from: "standard",
                      to: "jira",
                    });
                  })
                }
              >
                標準 Markdown → Jira Markdown
              </button>
            </li>
            <li>
              <button
                type="button"
                class="wiki-edit-operation"
                tabindex="-1"
                onclick={(e) =>
                  handleClick(e, (textarea) => {
                    const original = textarea.value;
                    textarea.value = convertMarkdown({
                      source: original,
                      from: "jira",
                      to: "standard",
                    });
                  })
                }
              >
                Jira Markdown → 標準 Markdown
              </button>
            </li>
          </ul>
        </div>
      </div> */}
    </>
  );
}
