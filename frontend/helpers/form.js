import RegForm from "../services/formService.js";
import refs from "./refs.js";

const formController = new RegForm();

async function handleRegFormSubmit(event) {
  event.preventDefault();
  const formAction = event.currentTarget.dataset.action;

  const user = {
    username: event.currentTarget.elements.username.value.trim(),
    password: event.currentTarget.elements.password.value.trim(),
  };
  localStorage.setItem("username", user.username);

  if (formAction === RegForm.ENDPOINTS.login) {
    try {
      const res = await formController.login(user);
      if (res.status === 200) {
        Notiflix.Notify.success("Welcome back!");
        formController.closeForm();
        refs.reqHistory.textContent = res.data.reqHistory.join(", ");
      }
    } catch (err) {
      Notiflix.Notify.failure(err.response.data.message);
    }
  } else {
    try {
      const res = await formController.registration(user);
      if (res.status === 200) {
        Notiflix.Notify.success("User successfully registered!");
        formController.closeForm();
      }
    } catch (err) {
      Notiflix.Notify.failure(err.response.data.message);
    }
  }
}

function handleSwitchFormAction() {
  const formAction = refs.regForm.dataset.action;

  if (formAction === RegForm.ENDPOINTS.login) {
    refs.formTitle.textContent = "Register Form";
    refs.regForm.dataset.action = RegForm.ENDPOINTS.registration;
    refs.regForm.elements.submit.value = "Signup";
    refs.switchBtnQuestion.textContent = "Have account?";
    refs.switchFormAction.textContent = "Login now";
  } else {
    refs.formTitle.textContent = "Login Form";
    refs.regForm.dataset.action = RegForm.ENDPOINTS.login;
    refs.regForm.elements.submit.value = "Login";
    refs.switchBtnQuestion.textContent = "Not a member?";
    refs.switchFormAction.textContent = "Signup now";
  }
}

export { handleRegFormSubmit, handleSwitchFormAction };
