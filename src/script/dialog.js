import { ATTRIBUTE_CLOSE } from "./constant.js";
const NAME = "dialog";

class DialogClass {
  constructor(el) {
    this._el = el;
    this._el.addEventListener(
      "click",
      ev => {
        let target = ev.target;
        if (target.getAttribute(ATTRIBUTE_CLOSE) === NAME) {
          this.close();
        }
      },
      false
    );
    return this;
  }
  open() {
    this._el.classList.add("in");
    this._el.offsetHeight && (this._el.style.opacity = 1);
    document.body.style.overflow = "hidden";
  }
  close() {
    this._el.style.opacity = 0;
    this._el.classList.remove("in");
    document.body.style.overflow = "inherit";
  }
}

const createDialog = el => {
  return new DialogClass(el);
};

export default createDialog;
