/*!
 * babyui.js v1.0.0
 * (c) 2019-2020 JaxBBLL
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.babyui = factory());
}(this, function () { 'use strict';

  var ATTRIBUTE_CLOSE = "data-dismiss";

  var NAME = "alert";

  var Alert = function Alert(el) {
    var this$1 = this;
    el.addEventListener("click", function (ev) {
      var target = ev.target;

      if (target.getAttribute(ATTRIBUTE_CLOSE) === NAME) {
        this$1._close(el);
      }
    }, false);
  };

  Alert.prototype._close = function _close(el) {
    el.parentNode.removeChild(el);
  };

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("." + NAME).forEach(function (el) {
      new Alert(el);
    });
  });

  var NAME$1 = "dialog";

  var DialogClass = function DialogClass(el) {
    var this$1 = this;
    this._el = el;

    this._el.addEventListener("click", function (ev) {
      var target = ev.target;

      if (target.getAttribute(ATTRIBUTE_CLOSE) === NAME$1) {
        this$1.close();
      }
    }, false);

    return this;
  };

  DialogClass.prototype.open = function open() {
    this._el.classList.add("in");

    this._el.offsetHeight && (this._el.style.opacity = 1);
    document.body.style.overflow = "hidden";
  };

  DialogClass.prototype.close = function close() {
    this._el.style.opacity = 0;

    this._el.classList.remove("in");

    document.body.style.overflow = "inherit";
  };

  var createDialog = function createDialog(el) {
    return new DialogClass(el);
  };

  var babyui = {
    createDialog: createDialog
  };

  return babyui;

}));
