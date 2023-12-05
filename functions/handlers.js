import refs from "../functions/refs.js";
import { save, STORAGE_KEYS } from "../services/storage.js";

function handleFormInput(event) {
  let key = "";
  if (event.target.name === "url") {
    key = STORAGE_KEYS.url;
  } else if (event.target.name === "method") {
    key = STORAGE_KEYS.method;
  }

  save(key, event.target.value);
}

function handleFormSubmit(event) {
  event.preventDefault();
  const { url, method } = event.currentTarget.elements;
  refs.currentURL.textContent =
    `${method.value} ${url.value.trim()}` || "Untitled Request";
}

export { handleFormInput, handleFormSubmit };
