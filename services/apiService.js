function createMethod(url, data) {
  console.log("POST: \n\tvalue:", data);

  return axios.post(url, data);
}

async function getMethod(url) {
  return await axios.get(url);
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
