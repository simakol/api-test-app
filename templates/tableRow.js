import refs from "../helpers/refs.js";
// const markup =
//   '<tr><td><input type="text" name="key" placeholder="Key" /></td><td ><input type="text" name="value" placeholder="Value" /></td></tr>';

function getRowMarkup(dataId, key = "", value = "") {
  return `<tr data-id="${dataId}"><td><input type="text" name="key" placeholder="Key" value="${key}"/></td><td ><input type="text" name="value" placeholder="Value" value="${value}"/></td></tr>`;
}

export function insertRow(key, value, id) {
  // const allTR = refs.queryTableBody.children;
  // const prevId = Number(allTR[allTR.length - 1]?.dataset.id) || 0;

  refs.queryTableBody.insertAdjacentHTML(
    "beforeend",
    getRowMarkup(id, key, value)
  );
}

// export function deleteLastRow() {
//   const children = refs.queryTableBody.children;
//   refs.queryTableBody.removeChild(children[children.length - 2]);
// }

// export const tableTemplate = `${getRowMarkup(0)}${getRowMarkup(1)}`;
