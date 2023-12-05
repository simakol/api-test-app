import { handleFormInput, handleFormSubmit } from "./functions/handlers.js";
import refs from "./functions/refs.js";
import { STORAGE_KEYS, load } from "./services/storage.js";

fillFormFromLS();

refs.mainForm.addEventListener("input", handleFormInput);
refs.mainForm.addEventListener("submit", handleFormSubmit);

function fillFormFromLS() {
  const url = load(STORAGE_KEYS.url);
  const method = load(STORAGE_KEYS.method);

  refs.mainForm.elements.url.value = url;
  refs.mainForm.elements.method.value = method;
}
