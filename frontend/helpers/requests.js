import refs from "./refs.js";
import RegForm from "../services/formService.js";

const fillResponseData = ({
  dataSizeKB = 0,
  status = "",
  responseTimeMs = 0,
} = {}) => {
  refs.resSize.textContent = dataSizeKB + " KB";
  refs.resStatus.textContent = status;
  refs.resTime.textContent = responseTimeMs.toFixed(2) + " ms";
};

const streamToObj = (obj) => JSON.parse(JSON.stringify(obj));

const showDataInJSONTree = (data) => {
  refs.jsonTree.innerHTML = "";
  const tree = jsonTree.create(data, refs.jsonTree);
  tree.expand();
};

const addUrlToDB = async () => {
  // add url to db
  const username = localStorage.getItem("username");
  const url = JSON.parse(localStorage.getItem("url"));
  if (!username || !url) return;

  const formController = new RegForm();
  try {
    const res = await formController.addToHistory(username, url);
    refs.reqHistory.textContent = res.data.reqHistory.join(", ");
  } catch (err) {
    console.log(err);
  }
};

//* === requests methods ===

const sendRequest = async (methodFunc) => {
  const responseData = {};
  const sendDate = performance.now();
  let result = {};

  try {
    result = await methodFunc();
    const receiveDate = performance.now();

    responseData.dataSizeKB = result.headers["content-length"] / 1000;
    responseData.status = result.status;
    responseData.responseTimeMs = receiveDate - sendDate;

    showDataInJSONTree(result.data);
  } catch (err) {
    const receiveDate = performance.now();
    result = err.response;

    responseData.dataSizeKB = err.response.headers["content-length"] / 1000;
    responseData.status = err.response.status + " " + err.response.statusText;
    responseData.responseTimeMs = receiveDate - sendDate;

    showDataInJSONTree(streamToObj(err.response));
  }

  fillResponseData(responseData);
  addUrlToDB();
  return result;
};

export { sendRequest, fillResponseData };
