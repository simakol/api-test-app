import refs from "./refs.js";
import { save, STORAGE_KEYS } from "../services/storage.js";
import { urlToParamsArr, paramsArrToObj } from "./parsing.js";
import {
  insertRow,
  tableTemplate,
  deleteLastRow,
} from "../templates/tableRow.js";
import {
  getMethod,
  deleteMethod,
  updatePatchMethod,
  updatePutMethod,
  createMethod,
} from "../services/apiService.js";

import jsonTree from "../script.js";

const fillTableRows = function (paramsArr) {
  const trList = [...refs.queryTableBody.children];
  for (const i in trList) {
    const tdList = [...trList[i].children];
    for (const j in tdList) {
      //TODO: error reading 0
      tdList[j].children[0].value = paramsArr[i][j] ?? "";
    }
  }
};

function handleFormInput(event) {
  let key = "";
  if (event.target.name === "url") {
    key = STORAGE_KEYS.url;

    const paramsArr = urlToParamsArr(event.target.value);
    const paramsObj = paramsArrToObj(paramsArr);

    if (refs.queryTableBody.children.length - 1 > paramsArr.length) {
      deleteLastRow();
    }

    if (paramsArr.length < 2) {
      refs.queryTableBody.innerHTML = tableTemplate;
    }

    fillTableRows(paramsArr);
    insertRow();
  } else if (event.target.name === "method") {
    key = STORAGE_KEYS.method;
  }

  save(key, event.target.value);
}

async function handleFormSubmit(event) {
  event.preventDefault();
  refs.jsonTree.innerHTML = "Loading...";
  
  const { url, method } = event.currentTarget.elements;
  refs.currentURL.textContent =
    `${method.value} ${url.value.trim()}` || "Untitled Request";

  switch (method.value) {
    case "GET": {
      const result = await getMethod(url.value);
      refs.jsonTree.innerHTML = "";
      const tree = jsonTree.create(result.data, refs.jsonTree);
      tree.expand();
      break;
    }
  }
}

function handleTableParamsInput(event) {
  // console.dir(event.target);
  //TODO: add logic to change URL by input
}

export { handleFormInput, handleFormSubmit, handleTableParamsInput };
