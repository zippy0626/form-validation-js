const FormChecker = {
  checkFirstName() {
    const input = document.querySelector("#first-name");

    if (input.validity.valueMissing) {
      input.setCustomValidity("Please provide a first name!");
      return false;
    } else if (input.validity.tooLong) {
      input.setCustomValidity("First Name too Long!");
      return false;
    } else if (input.validity.tooShort) {
      input.setCustomValidity("First Name too short!");
      return false;
    } else {
      input.setCustomValidity("");
      return true;
    };
  },

  checkLastName() {
    const input = document.querySelector("#last-name");

    if (input.validity.valueMissing) {
      input.setCustomValidity("Please provide a last name!");
      return false;
    } else if (input.validity.tooLong) {
      input.setCustomValidity("Last Name too Long!");
      return false;
    } else if (input.validity.tooShort) {
      input.setCustomValidity("Last Name too short!");
      return false;
    } else {
      return true;
    };
  },

  checkEmail() {
    const input = document.querySelector("#email");
    const inputValue = input.value;
    const test = (str) => /@.*\./.test(str);

    if (input.validity.valueMissing) {
      input.setCustomValidity("Please provide an email!");
      return false;
    } else if (input.validity.tooShort) {
      input.setCustomValidity("Email too short!");
      return false;
    } else if (!test(inputValue)) {
      input.setCustomValidity("Email does not match format!");
      return false;
    } else {
      return true;
    };
  },

  checkCountry() {
    const input = document.querySelector("#country");
    const inputValue = input.value;

    if (!inputValue) {
      input.setCustomValidity("Please provide a Country!");
      return false;
    } else {
      return true;
    };
  },

  checkZipCode() {
    const input = document.querySelector("#zip-code");
    const inputValue = input.value;
    const test = (str) => /(^\d{5}(-\d{4})?$)/.test(str);

    if (!test(inputValue)) {
      input.setCustomValidity("Please provide a valid Zip Code!");
      return false;
    } else {
      return true;
    };
  },

  checkAll() {
    
  },
};

export default FormChecker;
