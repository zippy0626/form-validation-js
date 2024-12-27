const FormChecker = {

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

export default FormChecker;
