const passwordValidator = {
  checkLength() {
    const passwordInput = document.querySelector("#password");

    if (
      passwordInput.validity.tooShort ||
      passwordInput.validity.valueMissing
    ) {
      passwordInput.setCustomValidity("Password too short!");
      changeRequirementStatus(".length", false);
      return false;
    } else {
      passwordInput.setCustomValidity("");
      changeRequirementStatus(".length", true);
      return true;
    }
  },

  checkNumber() {
    const passwordInput = document.querySelector("#password");
    const inputValue = passwordInput.value;
    const test = (string) => /\d+/gm.test(string);

    if (!test(inputValue)) {
      passwordInput.setCustomValidity("Password does not have a number!");
      changeRequirementStatus(".number", false);
      return false;
    } else {
      passwordInput.setCustomValidity("");
      changeRequirementStatus(".number", true);
      return true;
    }
  },

  checkUpperCaseLetter() {
    const passwordInput = document.querySelector("#password");
    const inputValue = passwordInput.value;
    const test = (string) => /[A-Z]+/gm.test(string);

    if (!test(inputValue)) {
      passwordInput.setCustomValidity(
        "Password does not have an uppercase letter!"
      );
      changeRequirementStatus(".upper", false);
      return false;
    } else {
      passwordInput.setCustomValidity("");
      changeRequirementStatus(".upper", true);
      return true;
    }
  },

  checkLowerCaseLetter() {
    const passwordInput = document.querySelector("#password");
    const inputValue = passwordInput.value;
    const test = (string) => /[a-z]+/gm.test(string);

    if (!test(inputValue)) {
      passwordInput.setCustomValidity(
        "Password does not have an lowercase letter!"
      );
      changeRequirementStatus(".lower", false);
      return false;
    } else {
      passwordInput.setCustomValidity("");
      changeRequirementStatus(".lower", true);
      return true;
    }
  },

  checkSpecialCharacter() {
    const passwordInput = document.querySelector("#password");
    const inputValue = passwordInput.value;
    const test = (string) => /(?=.{3,})(?!.*(.).*\1)[~`!@#$%^&*()]/.test(string);

    if (!test(inputValue)) {
      passwordInput.setCustomValidity(
        "Password does not have a special character!"
      );
      changeRequirementStatus(".special", false);
      return false;
    } else {
      passwordInput.setCustomValidity("");
      changeRequirementStatus(".special", true);
      return true;
    }
  },

  checkConfirmPassword() {
    const passwordInput = document.querySelector("#password");
    const confirmInput = document.querySelector("#confirm-password");

    const confirmInputValue = confirmInput.value;
    const passwordInputValue = passwordInput.value;

    if (passwordInputValue) {
      if (confirmInputValue !== passwordInputValue) return false;
    } else {
      return true;
    };
  },

  checkAll() {
    this.checkLength();
    this.checkNumber();
    this.checkLowerCaseLetter();
    this.checkUpperCaseLetter();
    this.checkSpecialCharacter();
    this.checkConfirmPassword();
  },
};

function changeRequirementStatus(selector, isDone) {
  const criteria = document.querySelector(selector);

  if (isDone) {
    criteria.style.setProperty("--beforeColor", "rgb(0, 177, 0)");
    criteria.style.setProperty("--beforeContent", '"✔"'); //need double quotes for content
  } else {
    criteria.style.setProperty("--beforeColor", "rgb(203, 0, 0)");
    criteria.style.setProperty("--beforeContent", '"✘"');
  }
}

export { passwordValidator };
