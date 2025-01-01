const FormChecker = {
  //helper fns
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

    setTimeout(() => {
      input.blur();
      input.setCustomValidity("");
      input.focus();
    }, MILLISECONDS);
  },

  setShowResetHideValidMsg(selector, message, MILLISECONDS) {
    this.setValidationMsg(selector, message);
    this.showValidationMsg(selector);
    this.hideValidationMsg(selector, MILLISECONDS);
  },

  changeInputOutline(bool, input) {
    if (!bool) {
      input.classList.add("error");
      input.classList.remove("good");
    } else {
      input.classList.add("good");
      input.classList.remove("error");
    }
  },

  updateFalseInput(selector, message, MILLISECONDS) {
    const input = document.querySelector(selector);
    this.setShowResetHideValidMsg(selector, message, MILLISECONDS);
    this.changeInputOutline(false, input);
  },
  //

  checkFirstName() {
    const input = document.querySelector("#first-name");
    const validStatus = input.validity;

    if (validStatus.valueMissing) {
      this.updateFalseInput("#first-name", "First name is missing!", 4000);
      return false;
    } else if (validStatus.tooShort) {
      this.updateFalseInput("#first-name", "First name is too short!", 4000);
      return false;
    } else if (validStatus.tooLong) {
      this.updateFalseInput("#first-name", "First name is too long!", 4000);
      return false;
    } else if (validStatus.patternMismatch) {
      this.updateFalseInput(
        "#first-name",
        "First name should only have letters!",
        4000
      );
      return false;
    } else {
      input.setCustomValidity("");
      this.changeInputOutline(true, input);
      return true;
    }
  },

  checkLastName() {
    const input = document.querySelector("#last-name");
    const validStatus = input.validity;

    if (validStatus.valueMissing) {
      this.updateFalseInput("#last-name", "Last name is missing!", 4000);
      return false;
    } else if (validStatus.tooShort) {
      this.updateFalseInput("#last-name", "Last name is too short!", 4000);
      return false;
    } else if (validStatus.tooLong) {
      this.updateFalseInput("#last-name", "Last name is too long!", 4000);
      return false;
    } else if (validStatus.patternMismatch) {
      this.updateFalseInput(
        "#last-name",
        "Last name should only have letters!",
        4000
      );
      return false;
    } else {
      input.setCustomValidity("");
      this.changeInputOutline(true, input);
      return true;
    }
  },

  checkEmail() {
    const input = document.querySelector("#email");
    const validStatus = input.validity;

    if (validStatus.valueMissing) {
      this.updateFalseInput("#email", "Email is missing!", 4000);
      return false;
    } else if (validStatus.typeMismatch) {
      this.updateFalseInput(
        "#email",
        "Email is not a valid format! (eg. your-email@domain.com)",
        4000
      );
      return false;
    } else {
      input.setCustomValidity("");
      this.changeInputOutline(true, input);
      return true;
    }
  },

  checkCountry() {
    const input = document.querySelector("#country");
    const value = input.value;

    if (!value) {
      this.updateFalseInput(
        "#country",
        "Please provide a country of residence!",
        4000
      );
      return false;
    } else {
      input.setCustomValidity("");
      this.changeInputOutline(true, input);
      return true;
    }
  },

  checkZipCode() {
    const input = document.querySelector("#zip-code");
    const value = input.value;

    if (!/^[0-9]{5}$/gm.test(value)) {
      this.updateFalseInput(
        "#zip-code",
        "Zip code is not a valid format! (eg. 12345)",
        3000
      );
      this.changeInputOutline(false, input);
      return false;
    } else {
      input.setCustomValidity("");
      this.changeInputOutline(true, input);
      return true;
    }
  },

  checkPassword() {
    //helper fn
    function checkPattern(regex, selector, validationMsg) {
      const input = document.querySelector(selector);
      const value = input.value;
      const isValid = regex.test(value);

      if (!isValid) {
        FormChecker.setShowResetHideValidMsg(selector, validationMsg, 4000);
        FormChecker.changeInputOutline(false, input);
        return isValid;
      } else {
        input.setCustomValidity("");
        FormChecker.changeInputOutline(true, input);
        return isValid;
      }
    }

    function checkLength() {
      return checkPattern(
        /.{12,24}/,
        "#password",
        "Password is too short/long!"
      );
    }

    function checkUpper() {
      return checkPattern(
        /[A-Z]/,
        "#password",
        "Password does not have an uppercase letter!"
      );
    }

    function checkLower() {
      return checkPattern(
        /[a-z]/,
        "#password",
        "Password does not have a lowercase letter!"
      );
    }

    function checkNumber() {
      return checkPattern(
        /[0-9]/,
        "#password",
        "Password does not have a number!"
      );
    }

    function checkSpecial() {
      const element = document.querySelector("#password");
      const value = element.value;
      const specialChars = [...new Set(value.match(/[~`!@#$%^&*()]/g))];
      if (specialChars.length < 3) {
        element.setCustomValidity(
          "Password does not have three distinct special characters!"
        );
        element.reportValidity();
        FormChecker.changeInputOutline(false, element);
      } else {
        element.setCustomValidity("");
        FormChecker.changeInputOutline(true, element);
      }
    }

    function checkConfirmPassword() {
      const password = document.querySelector("#password");
      const confirmPassword = document.querySelector("#confirm-password");

      if (password.value !== confirmPassword.value) {
        FormChecker.updateFalseInput(
          "#confirm-password",
          "Passwords do not match!",
          4000
        );
        return false;
      } else {
        password.setCustomValidity("");
        confirmPassword.setCustomValidity("");
        FormChecker.changeInputOutline(true, password);
        FormChecker.changeInputOutline(true, confirmPassword);
        return true;
      }
    }

    const functionMap = {
      checkLength,
      checkUpper,
      checkLower,
      checkNumber,
      checkSpecial,
      checkConfirmPassword,
    };

    for (const fnName in functionMap) {
      const result = functionMap[fnName]();
      if (!result) return;
    }
  },

  updatePasswordVisualReqs() {
    //helper fn
    function checkPattern(regex, selector, reqSelector) {
      const value = document.querySelector(selector).value;
      const isValid = regex.test(value);
      changeRequirementStatus(reqSelector, isValid);
      return isValid;
    }

    function checkLength() {
      return checkPattern(/.{12,24}/, "#password", ".length");
    }

    function checkUpper() {
      return checkPattern(/[A-Z]/, "#password", ".upper");
    }

    function checkLower() {
      return checkPattern(/[a-z]/, "#password", ".lower");
    }

    function checkNumber() {
      return checkPattern(/[0-9]/, "#password", ".number");
    }

    function checkSpecial() {
      const value = document.querySelector("#password").value;
      const specialChars = [...new Set(value.match(/[~`!@#$%^&*()]/g))];
      if (specialChars.length < 3) {
        changeRequirementStatus(".special", false);
      } else {
        changeRequirementStatus(".special", true);
      }
    }

    checkLength();
    checkUpper();
    checkLower();
    checkNumber();
    checkSpecial();
  },

  checkOtherFormFields() {
    const methodsToCheck = [
      "checkFirstName",
      "checkLastName",
      "checkEmail",
      "checkCountry",
      "checkZipCode",
      "checkPassword",
    ];

    for (const method of methodsToCheck) {
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
