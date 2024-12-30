const FormChecker = {
  setValidationMsg(selector, message) {
    const input = document.querySelector(selector);
    input.setCustomValidity(message);
  },

  showValidationMsg(selector) {
    const input = document.querySelector(selector);
    input.classList.add("error");
    input.reportValidity();
  },

  hideValidationMsg(selector, MILLISECONDS) {
    const input = document.querySelector(selector);

    let userInteracted = false;

    //Tell if user focuses(tab) somewhere else
    const handleFocusOut = () => {
      userInteracted = true;
      document.removeEventListener("focusin", handleFocusOut);
    };

    document.addEventListener("focusin", handleFocusOut);

    setTimeout(() => {
      if (!userInteracted) {
        input.blur(); //this needs to be first
        input.setCustomValidity("");
        input.focus();
      } else {
        input.blur();
        input.setCustomValidity("");
      };
    }, MILLISECONDS);
  },

  setShowResetHideValidMsg(selector, message, MILLISECONDS) {
    this.setValidationMsg(selector, message);
    this.showValidationMsg(selector);
    this.hideValidationMsg(selector, MILLISECONDS);
  },

  changeOutline(bool, input) {
    if (!bool) {
      input.classList.add("error");
      input.classList.remove("good");
    } else {
      input.classList.add("good");
      input.classList.remove("error");
    }
  },

  checkFirstName() {
    const input = document.querySelector("#first-name");
    const validStatus = input.validity;

    if (validStatus.valueMissing) {
      this.setShowResetHideValidMsg(
        "#first-name",
        "First name is missing!",
        3000
      );
      this.changeOutline(false, input);
      return false;
    } else if (validStatus.tooShort) {
      this.setShowResetHideValidMsg(
        "#first-name",
        "First name is too short!",
        3000
      );
      this.changeOutline(false, input);
      return false;
    } else if (validStatus.tooLong) {
      this.setShowResetHideValidMsg(
        "#first-name",
        "First name is too long!",
        3000
      );
      this.changeOutline(false, input);
      return false;
    } else if (validStatus.patternMismatch) {
      this.setShowResetHideValidMsg(
        "#first-name",
        "First name should only have letters!",
        3000
      );
      this.changeOutline(false, input);
      return false;
    } else {
      input.setCustomValidity("");
      this.changeOutline(true, input);
      return true;
    }
  },

  checkLastName() {
    const input = document.querySelector("#last-name");
    const validStatus = input.validity;

    if (validStatus.valueMissing) {
      this.setShowResetHideValidMsg(
        "#last-name",
        "Last name is missing!",
        3000
      );
      this.changeOutline(false, input);
      return false;
    } else if (validStatus.tooShort) {
      this.setShowResetHideValidMsg(
        "#last-name",
        "Last name is too short!",
        3000
      );
      this.changeOutline(false, input);
      return false;
    } else if (validStatus.tooLong) {
      this.setShowResetHideValidMsg(
        "#last-name",
        "Last name is too long!",
        3000
      );
      this.changeOutline(false, input);
      return false;
    } else if (validStatus.patternMismatch) {
      this.setShowResetHideValidMsg(
        "#last-name",
        "Last name should only have letters!",
        3000
      );
      this.changeOutline(false, input);
      return false;
    } else {
      input.setCustomValidity("");
      this.changeOutline(true, input);
      return true;
    }
  },

  checkEmail() {
    const input = document.querySelector("#email");
    const validStatus = input.validity;

    if (validStatus.valueMissing) {
      this.setShowResetHideValidMsg("#email", "Email is Missing!", 3000);
      this.changeOutline(false, input);
      return false;
    } else if (validStatus.typeMismatch) {
      this.setShowResetHideValidMsg(
        "#email",
        "Email is not a valid format!",
        3000
      );
      this.changeOutline(false, input);
      return false;
    } else {
      input.setCustomValidity("");
      this.changeOutline(true, input);
      return true;
    }
  },

  checkCountry() {
    const input = document.querySelector("#country");
    const value = input.value;

    if (!value) {
      this.setShowResetHideValidMsg(
        "#country",
        "Please provide a country of residence!",
        3000
      );
      this.changeOutline(false, input);
      return false;
    } else {
      input.setCustomValidity("");
      this.changeOutline(true, input);
      return true;
    }
  },

  checkZipCode() {
    const input = document.querySelector("#zip-code");
    const value = input.value;

    if (!/^[0-9]{5}$/gm.test(value)) {
      this.setShowResetHideValidMsg(
        "#zip-code",
        "Zip code is not a valid format!"
      );
      this.changeOutline(false, input);
    } else {
      input.setCustomValidity("");
      this.changeOutline(true, input);
      return true;
    }
  },

  checkPassword() {
    const input = document.querySelector("#password");
  },

  checkAll() {
    const thingsToCheck = [
      "checkFirstName",
      "checkLastName",
      "checkEmail",
      "checkCountry",
      "checkZipCode",
    ];

    for (const method of thingsToCheck) {
      if (typeof FormChecker[method] === "function") {
        if (FormChecker[method]() === false) return;
      }
    }
  },
};

function changeRequirementStatus(selector, isDone) {
  const requirement = document.querySelector(selector);

  if (isDone) {
    requirement.style.setProperty("--beforeColor", "rgb(0, 177, 0)");
    requirement.style.setProperty("--beforeContent", '"✔"'); //need double quotes for content
  } else {
    requirement.style.setProperty("--beforeColor", "rgb(203, 0, 0)");
    requirement.style.setProperty("--beforeContent", '"✘"');
  }
}

export { FormChecker, changeRequirementStatus };
