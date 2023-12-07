function urlToParamsArr(url) {
  const paramsPart = url.trim().split("/?")[1];
  if (!paramsPart) {
    return [];
  }
  const paramsArr = paramsPart.split("&").map((param) => param.split("="));

  return paramsArr;
}

function paramsArrToObj(arr) {
  // if we put the string url -> automatic convert it to params arr
  if (typeof arr === "string") {
    arr = urlToParamsArr(arr);
  }

  return arr.reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {});
}

export { urlToParamsArr, paramsArrToObj };
