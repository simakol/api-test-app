import refs from "./refs.js";
import { save, STORAGE_KEYS } from "../services/storage.js";
import { urlToParamsArr, paramsArrToObj } from "./parsing.js";
import { insertRow } from "../templates/tableRow.js";
import {
  getMethod,
  deleteMethod,
  updatePatchMethod,
  updatePutMethod,
  createMethod,
} from "../services/apiService.js";
import jsonTree from "../script.js";


const fillTableWithData = (paramsArr) => {
  const paramsAmount = paramsArr.length;

  refs.queryTableBody.innerHTML = "";
  for (let i = 0; i <= paramsAmount; i += 1) {
    const [key, value] = paramsArr[i] || [];
    insertRow(key, value, i);
  }
};

const fillResponseData = ({ dataSizeKB, status }) => {
  refs.resSize.textContent = dataSizeKB + " KB";
  refs.resStatus.textContent = status;
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
  // const paramsObj = paramsArrToObj(paramsArr);

  fillTableWithData(paramsArr);

  save(STORAGE_KEYS.url, target.value);
}

async function handleFormSubmit(event) {
  event.preventDefault();
  refs.jsonTree.innerHTML = "Loading...";

  const { url, method } = event.currentTarget.elements;
  refs.currentURL.textContent =
    `${method.value} ${url.value.trim()}` || "Untitled Request";

  switch (method.value) {
    //TODO: error handle + more data visualize
    case "GET": {
      try {
        const result = await getMethod(url.value);
        const blobRes = await getMethod(url.value, true);
        const dataSizeKB = (blobRes.data.size / 1000).toFixed(1);
        const { status } = result;

        console.log(result);
        fillResponseData({
          dataSizeKB,
          status,
        });

        refs.jsonTree.innerHTML = "";
        const tree = jsonTree.create(result.data, refs.jsonTree);
        tree.expand();
      } catch (err) {
        fillResponseData({
          dataSizeKB: 0,
          status: err.response.status,
        });

        refs.jsonTree.innerHTML = "";
        console.log(err.response);
        const tree = jsonTree.create(err.response.data, refs.jsonTree);
        tree.expand();
      }
      break;
    }
  }
}

function handleTableParamsInput(event) {
  // console.dir(event.target);
  //TODO: add logic to change URL by input
}

export { handleFormInput, handleFormSubmit, handleTableParamsInput };
