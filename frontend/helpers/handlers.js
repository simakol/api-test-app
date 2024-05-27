import refs from "./refs.js";
import { save, STORAGE_KEYS } from "../services/storage.js";
import { urlToParamsArr, paramsArrToObj } from "./parsing.js";
import { insertRow } from "../templates/tableRow.js";
import { sendRequest } from "./requests.js";
import RegForm from "../services/formService.js";
import {
  getMethod,
  deleteMethod,
  updatePatchMethod,
  updatePutMethod,
  createMethod,
} from "../services/apiService.js";
import { fillResponseData } from "./requests.js";

const fillTableWithData = (paramsArr) => {
  const paramsAmount = paramsArr.length;

  refs.queryTableBody.innerHTML = "";

  //creating 2 rows if there is no parametrs
  if (paramsAmount === 0) {
    insertRow("", "", 0);
    insertRow("", "", 1);
    return;
  }

  // fill rows with params
  for (let i = 0; i <= paramsAmount; i += 1) {
    const [key, value] = paramsArr[i] || [];
    insertRow(key, value, i);
  }
};

const getReqBody = () => {
  let textareaValue = refs.reqBody.value.trim();

  try {
    textareaValue = JSON.parse(textareaValue);
  } catch (err) {
    Notiflix.Notify.failure(err.message);
    return "";
  }

  return textareaValue;
};

function handleFormInput(event) {
  if (event.target.name === "method") {
    save(STORAGE_KEYS.method, event.target.value);
    return;
  }
  let target = event.target;

  // when we dispatch event from ls
  if (target === refs.mainForm) {
    target = refs.mainForm.elements.url;
  }

  const paramsArr = urlToParamsArr(target.value);

  fillTableWithData(paramsArr);

  save(STORAGE_KEYS.url, target.value);
}

function handleFormSubmit(event) {
  event.preventDefault();
  refs.jsonTree.innerHTML = "Loading...";

  const { url, method } = event.currentTarget.elements;
  refs.currentURL.textContent =
    `${method.value} ${url.value.trim()}` || "Untitled Request";

  const isMethodContainsBody = ["PUT", "PATCH", "POST"].includes(method.value);
  const reqBody = isMethodContainsBody ? getReqBody() : "";

  // in case of json parsing error
  if (!reqBody && isMethodContainsBody) {
    // clear response and exit function
    refs.jsonTree.innerHTML = "";
    fillResponseData();
    return;
  }

  switch (method.value) {
    case "GET":
      sendRequest(() => getMethod(url.value));
      break;
    case "PUT":
      sendRequest(() => updatePutMethod(url.value, reqBody));
      break;
    case "PATCH":
      sendRequest(() => updatePatchMethod(url.value, reqBody));
      break;
    case "POST":
      sendRequest(() => createMethod(url.value, reqBody));
      break;
    case "DELETE":
      sendRequest(() => deleteMethod(url.value));
      break;
  }
}

function handleTableParamsInput(event) {
  let currentURL = refs.mainForm.url.value;
  const targetTR = event.target.closest("tr");
  const targetValue = event.target.value.trim();
  const targetName = event.target.name;
  const keyOrValueIndex = targetName === "key" ? 0 : 1; // key field comes first(0) in params arr, value comes second(1)
  const changeParamIndex = Number(targetTR.dataset.id);

  const splitters = {
    start: "/?",
    param: "&",
    equals: "=",
    slash: "/",
  };

  // if string doesn't ends with /? we must add it
  if (currentURL.endsWith(splitters.slash)) {
    currentURL += "?";
  } else if (!currentURL.endsWith(splitters.start)) {
    currentURL += splitters.start;
  }

  const urlParse = currentURL.split(splitters.start);
  const baseURL = `${urlParse[0]}${splitters.start}`;
  const paramsArr = urlParse[1].split(splitters.param); // gets arr with "key=value" elements

  // if current field is the last in table we need to add a new row
  if (changeParamIndex === refs.queryTableBody.children.length - 1) {
    insertRow("", "", changeParamIndex + 1);
    const newParam =
      keyOrValueIndex === 0 ? `${targetValue}=` : `=${targetValue}`;
    paramsArr.push(newParam);
  }

  const values = paramsArr[changeParamIndex].split(splitters.equals); // gets arr [key, value]

  values[keyOrValueIndex] = targetValue;
  // replace current key or value with value from input

  const changedParam = values.join(splitters.equals); // gets changed param like "key1111=value1"

  paramsArr[changeParamIndex] = changedParam;
  // replace current key=value with our changed data

  const paramsString = paramsArr.join(splitters.param); // get updated params string

  const newURL = `${baseURL}${paramsString}`;

  refs.mainForm.elements.url.value = newURL; //replace current url with updated

  save(STORAGE_KEYS.url, newURL);
}

const handleClearReqHistory = async () => {
  const username = localStorage.getItem("username");
  const formController = new RegForm();
  try {
    await formController.clearHistory(username);
    refs.reqHistory.textContent = "";
  } catch (err) {
    console.log(err);
  }
};

export {
  handleFormInput,
  handleFormSubmit,
  handleTableParamsInput,
  handleClearReqHistory,
};
