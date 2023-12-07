import {
  handleFormInput,
  handleFormSubmit,
  handleTableParamsInput,
} from "./helpers/handlers.js";
import refs from "./helpers/refs.js";
import { STORAGE_KEYS, load } from "./services/storage.js";

refs.mainForm.addEventListener("input", handleFormInput);
refs.queryTableBody.addEventListener("input", handleTableParamsInput);
refs.mainForm.addEventListener("submit", handleFormSubmit);

fillFormFromLS();

function fillFormFromLS() {
  const url = load(STORAGE_KEYS.url);
  const method = load(STORAGE_KEYS.method);

  refs.mainForm.elements.url.value = url;
  refs.mainForm.elements.method.value = method;

  refs.mainForm.dispatchEvent(new Event("input"));
}
export default jsonTree;
