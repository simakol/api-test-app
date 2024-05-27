import refs from "./refs.js";
import RegForm from "../services/formService.js";

const fillResponseData = ({
  dataSizeKB = 0,
  status = "",
  responseTimeMs = 0,
}) => {
  refs.resSize.textContent = dataSizeKB + " KB";
  refs.resStatus.textContent = status;
  refs.resTime.textContent = responseTimeMs + " ms";
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

const sendRequest = async (methodFunc, url) => {
  const responseData = {};
  const sendDate = new Date().getTime();

  try {
    const result = await methodFunc();
    const receiveDate = new Date().getTime();

    responseData.dataSizeKB = result.headers["content-length"] / 1000;
    responseData.status = result.status;
    responseData.responseTimeMs = receiveDate - sendDate;

    showDataInJSONTree(result.data);
  } catch (err) {
    const receiveDate = new Date().getTime();
    console.log(err);

    responseData.dataSizeKB = err.response.headers["content-length"] / 1000;
    responseData.status = err.response.status + " " + err.response.statusText;
    responseData.responseTimeMs = receiveDate - sendDate;

    showDataInJSONTree(streamToObj(err.response));
  }

  fillResponseData(responseData);
  addUrlToDB();
};

export { sendRequest };
