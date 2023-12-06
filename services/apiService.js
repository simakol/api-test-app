function createMethod(url, data) {
  console.log("POST: \n\tvalue:", data);

  return axios.post(url, data);
}

async function getMethod(url, isBlob) {
  return await axios.get(url, isBlob ? { responseType: "blob" } : {});
}

function deleteMethod(url) {
  return axios.delete(url);
}

function updatePutMethod(url, data) {
  return axios.put(url, data);
}

function updatePatchMethod(url, data) {
  return axios.patch(url, data);
}

export {
  createMethod,
  getMethod,
  deleteMethod,
  updatePutMethod,
  updatePatchMethod,
};
