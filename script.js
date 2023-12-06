import {
  handleFormInput,
  handleFormSubmit,
  handleTableParamsInput,
} from "./helpers/handlers.js";
import refs from "./helpers/refs.js";
import { STORAGE_KEYS, load } from "./services/storage.js";

fillFormFromLS();

refs.mainForm.addEventListener("input", handleFormInput);
refs.queryTableBody.addEventListener("input", handleTableParamsInput);
refs.mainForm.addEventListener("submit", handleFormSubmit);

function fillFormFromLS() {
  const url = load(STORAGE_KEYS.url);
  const method = load(STORAGE_KEYS.method);

  refs.mainForm.elements.url.value = url;
  refs.mainForm.elements.method.value = method;

  //TODO: fix event or remove LS
  refs.mainForm.dispatchEvent(new Event("input"));
}
export default jsonTree;
