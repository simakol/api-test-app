import refs from "../helpers/refs.js";
const markup =
  '<tr><td><input type="text" name="key" placeholder="Key" /></td><td><input type="text" name="value" placeholder="Value" /></td></tr>';

export function insertRow() {
  refs.queryTableBody.insertAdjacentHTML("beforeend", markup);
}
export function deleteLastRow() {
  const children = refs.queryTableBody.children;
  refs.queryTableBody.removeChild(children[children.length - 1]);
}

export const tableTemplate = `${markup}${markup}`;
