import { FormChecker } from "./FormChecker.js";

const Controller = {
  initialize() {
    this.handlePasswordReqsUpdating();
    this.handlePasswordToggle();
    this.handleSubmitButton();
    this.updateInputStyling();
  },

  handleSubmitButton() {
    const submitBtn = document.querySelector(".submit-button");
    submitBtn.addEventListener("click", () => {
      FormChecker.checkFormFields();
    });
  },

  handlePasswordReqsUpdating() {
    const passwordInput = document.querySelector("#password");
    passwordInput.addEventListener("input", () => {
      FormChecker.updatePasswordVisualReqs();
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

  updateInputStyling() {
    const styleForm = () => {
      const inputs = document.querySelectorAll("input, select");
      for (const input of inputs) {
        if (!input.value) {
          input.classList.remove("good");
          input.classList.remove("bad");
        }
      }

      //Don't want to show error for non filled inputs
      const filledInputs = Array.from(
        document.querySelectorAll("input, select")
      ).filter((input) => input.value);

      for (const input of filledInputs) {
        if (
          input.validity.valid &&
          input.id !== "password" &&
          input.id !== "confirm-password"
        ) {
          FormChecker.changeInputOutline(true, input);
        } else {
          FormChecker.changeInputOutline(false, input);
        }
      }
    };

    document.addEventListener("focusin", styleForm);
    document.addEventListener("click", styleForm);
  },
};

export default Controller;
