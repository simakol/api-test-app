import refs from "../helpers/refs.js";

function getRowMarkup(dataId, key = "", value = "") {
  return `<tr data-id="${dataId}"><td><input type="text" name="key" placeholder="Key" value="${key}"/></td><td ><input type="text" name="value" placeholder="Value" value="${value}"/></td></tr>`;
}

export function insertRow(key, value, id) {
  refs.queryTableBody.insertAdjacentHTML(
    "beforeend",
    getRowMarkup(id, key, value)
  );
}
