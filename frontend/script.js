import {
  handleFormInput,
  handleFormSubmit,
  handleTableParamsInput,
  handleClearReqHistory,
} from "./helpers/handlers.js";
import refs from "./helpers/refs.js";
import { STORAGE_KEYS, load } from "./services/storage.js";
import { handleRegFormSubmit, handleSwitchFormAction } from "./helpers/form.js";
import { switchSettingsTitles } from "./helpers/reqSettingsSwitcher.js";
import { sendGPTMessage } from "./chatGPT/chatGPT.js";
import measureApiSpeed from "./helpers/chart.js";

refs.mainForm.addEventListener("input", handleFormInput);
refs.queryTableBody.addEventListener("input", handleTableParamsInput);
refs.mainForm.addEventListener("submit", handleFormSubmit);
refs.regForm.addEventListener("submit", handleRegFormSubmit);
refs.switchFormAction.addEventListener("click", handleSwitchFormAction);
refs.clearHistoryBtn.addEventListener("click", handleClearReqHistory);
refs.reqSettingsTitles.addEventListener("click", switchSettingsTitles);
refs.gptBtn.addEventListener("click", sendGPTMessage);
refs.testAPIButton.addEventListener("click", measureApiSpeed);

fillFormFromLS();

function fillFormFromLS() {
  const url = load(STORAGE_KEYS.url) || "";
  const method = load(STORAGE_KEYS.method) || "GET";

  refs.mainForm.elements.url.value = url;
  refs.mainForm.elements.method.value = method;

  refs.mainForm.dispatchEvent(new Event("input"));
}
export default jsonTree;
