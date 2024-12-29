import { FormChecker } from "./FormChecker.js";

const Controller = {
  initialize() {
    this.handlePasswordFields();
    this.handlePasswordToggle();
    this.handleSubmitButton();
    this.handleUpdateInputStyling();
  },

  handleSubmitButton() {
    const submitBtn = document.querySelector(".submit-button");
    //Check on submit
    submitBtn.addEventListener("click", () => {
      FormChecker.checkAll();
    });
  },

  handlePasswordFields() {
    const passwordInput = document.querySelector("#password");
    passwordInput.addEventListener("input", () => {});
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

  handleUpdateInputStyling() {
    const styleForm = () => {
      //Don't want to show error for non filled inputs
      const filledInputs = Array.from(
        document.querySelectorAll("input, select")
      ).filter((input) => input.value);

      for (const input of filledInputs) {
        if (input.validity.valid) {
          FormChecker.setStatusValidOutline(true, input);
        } else {
          FormChecker.setStatusValidOutline(false, input);
        }
      }
    };

    document.addEventListener("focusin", styleForm);
    document.addEventListener('click', styleForm);
  },
};

export default Controller;
