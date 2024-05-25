import {
  handleFormInput,
  handleFormSubmit,
  handleTableParamsInput,
  handleClearReqHistory,
} from "./helpers/handlers.js";
import refs from "./helpers/refs.js";
import { STORAGE_KEYS, load } from "./services/storage.js";
import { handleRegFormSubmit, handleSwitchFormAction } from "./helpers/form.js";
import RegForm from "./services/formService.js";

refs.mainForm.addEventListener("input", handleFormInput);
refs.queryTableBody.addEventListener("input", handleTableParamsInput);
refs.mainForm.addEventListener("submit", handleFormSubmit);
refs.regForm.addEventListener("submit", handleRegFormSubmit);
refs.switchFormAction.addEventListener("click", handleSwitchFormAction);
refs.clearHistoryBtn.addEventListener("click", handleClearReqHistory);

fillFormFromLS();

function fillFormFromLS() {
  const url = load(STORAGE_KEYS.url) || "";
  const method = load(STORAGE_KEYS.method) || "GET";

  refs.mainForm.elements.url.value = url;
  refs.mainForm.elements.method.value = method;

  refs.mainForm.dispatchEvent(new Event("input"));
}
export default jsonTree;
