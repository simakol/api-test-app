import refs from "./refs.js";

const activeClass = "active";

function switchSettingsTitles(e) {
  if (e.target.tagName !== "H3") return;

  [...e.currentTarget.children].forEach((item, i) => {
    item.classList.remove(activeClass);
    if (item === e.target) {
      item.classList.add(activeClass);
      switchSettingsContent(i);
    }
  });
}

function switchSettingsContent(currentSelection) {
  [...refs.reqSettingsContent.children].forEach((item, i) => {
    item.classList.remove(activeClass);
    if (i === currentSelection) {
      item.classList.add(activeClass);
    }
  });
}

export { switchSettingsTitles };
