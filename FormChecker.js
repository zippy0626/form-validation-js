const FormChecker = {
  setValidationMsg(selector, message) {
    const input = document.querySelector(selector);
    input.setCustomValidity(message);
  },

  showValidationMsg(selector) {
    const input = document.querySelector(selector);
    input.reportValidity();
  },

  resetAndHideValidationMsg(selector) {
    const input = document.querySelector(selector);
    setTimeout(() => {
      input.blur(); //this needs to be first
      input.setCustomValidity("");
      input.focus();
    }, 3000);
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
