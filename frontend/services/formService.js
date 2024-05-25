import refs from "../helpers/refs.js";

class RegForm {
  static BASE_URL = "http://localhost:2121/auth";
  static ENDPOINTS = {
    login: "login",
    registration: "registration",
    addToHistory: "addToHistory",
    clearHistory: "clearHistory",
    users: "users",
  };

  async login({ username, password }) {
    const URL = `${RegForm.BASE_URL}/${RegForm.ENDPOINTS.login}`;
    const res = await axios.post(URL, { username, password });
    return res;
  }

  async registration({ username, password }) {
    const URL = `${RegForm.BASE_URL}/${RegForm.ENDPOINTS.registration}`;
    const res = await axios.post(URL, { username, password });
    return res;
  }

  async addToHistory(username, value) {
    const URL = `${RegForm.BASE_URL}/${RegForm.ENDPOINTS.addToHistory}/${username}`;
    const res = await axios.patch(URL, { value });
    return res;
  }
  async clearHistory(username) {
    const URL = `${RegForm.BASE_URL}/${RegForm.ENDPOINTS.clearHistory}/${username}`;
    const res = await axios.patch(URL, {});
    return res;
  }

  async getUserByUsername(username) {
    const URL = `${RegForm.BASE_URL}/${RegForm.ENDPOINTS.users}/${username}`;
    const res = await axios.get(URL);
    return res;
  }

  switchFormAction() {}

  closeForm() {
    const active = "active";
    refs.regForm.reset();
    refs.loginContainer.classList.remove(active);
    refs.mainContent.classList.add(active);
  }
}

export default RegForm;
