import { ATTRIBUTE_CLOSE } from "./constant.js";
const NAME = "alert";

class Alert {
  constructor(el) {
    el.addEventListener("click", ev => {
      let target = ev.target;
      if (target.getAttribute(ATTRIBUTE_CLOSE) === NAME) {
        this._close(el);
      }
    }, false);
  }

  _close(el) {
    el.parentNode.removeChild(el);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(`.${NAME}`).forEach(el => {
    new Alert(el);
  });
});

export default Alert;
