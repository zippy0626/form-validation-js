import FormChecker from "./formChecker.js";
import { passwordValidator } from "./passwordValidator.js";

const Controller = {
  initialize() {
    this.handlePasswordFieldsReqs();
    this.handlePasswordToggle();
    this.handleFormSubmitButton();
  },

  getDocumentCurrentFocus() {
    return document.activeElement;
  },

  handlePasswordFieldsReqs() {
    const passwordInput = document.querySelector("#password");

    passwordInput.addEventListener("input", () => {
      passwordValidator.checkAll();
    });
  },

  handleFormSubmitButton() {
    const submitBtn = document.querySelector('.submit-button');
    submitBtn.addEventListener('click', ()=>{
      
    });
  },

  handlePasswordToggle() {
    const showBtn = document.querySelector(".toggle-visible-button");
    const pwdInputs = document.querySelectorAll("input[type=password]");
    showBtn.addEventListener("click", () => {
      if (showBtn.textContent === "Hide") {
        showBtn.textContent = "Show";
        for (const input of pwdInputs) {
          input.type = "password";
        }
        return;
      }

      showBtn.textContent = "Hide";
      for (const input of pwdInputs) {
        input.type = "text";
      }
    });
  },
};

export default Controller;
