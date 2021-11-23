var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import React, { useState, useCallback, useMemo, useEffect, useRef, Fragment as Fragment$1, forwardRef, isValidElement } from "react";
import { useFocusManager, FocusScope } from "@react-aria/focus";
import { useFocusWithin, useHover } from "@react-aria/interactions";
import { Popover } from "@headlessui/react";
import { CustomCheckbox } from "@reach/checkbox";
const identity = (input) => input !== void 0 && input !== null;
function isObjectEmpty(object) {
  for (const prop in object) {
    if (Object.prototype.hasOwnProperty.call(object, prop))
      return false;
  }
  return true;
}
function same(key, thing) {
  return key === thing;
}
function genericSort(objectA, objectB, sorter) {
  const result = () => {
    if (objectA[sorter.property] > objectB[sorter.property]) {
      return 1;
    } else if (objectA[sorter.property] < objectB[sorter.property]) {
      return -1;
    } else {
      return 0;
    }
  };
  return sorter.isDescending ? result() * -1 : result();
}
function genericFilter(object, filters) {
  if (same(filters.length, 0)) {
    return true;
  }
  return filters.every((filter) => {
    return filter.isTruthyPicked ? object[filter.property] : !object[filter.property];
  });
}
function clxs(...predicate) {
  return predicate.filter(Boolean).join(" ");
}
function has(prop) {
  if (typeof prop === "string") {
    return prop.trim() !== "";
  }
  if (Array.isArray(prop)) {
    return prop.length > 0;
  } else
    return false;
}
const capitalize = (s) => {
  if (typeof s !== "string") {
    return "";
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
};
class Timer {
  constructor(cb, delay) {
    __publicField(this, "timerId", null);
    __publicField(this, "start");
    __publicField(this, "remaining");
    __publicField(this, "cb");
    __publicField(this, "resume", () => {
      this.start = Date.now();
      if (this.timerId !== null) {
        clearTimeout(this.timerId);
      }
      this.timerId = setTimeout(this.cb, this.remaining);
    });
    __publicField(this, "clear", () => {
      if (this.timerId !== null) {
        clearTimeout(this.timerId);
      }
    });
    __publicField(this, "pause", () => {
      if (this.timerId !== null) {
        clearTimeout(this.timerId);
      }
      if (this.start !== void 0) {
        this.remaining -= Date.now() - this.start;
      }
    });
    this.remaining = delay;
    this.cb = cb;
    this.resume();
  }
}
function useSelectable(items = [], initial = null, onChange, allowUnselected = false, allowMultiple = false) {
  const [selection, setSelection] = useState(() => identity(initial) ? [initial] : []);
  const updateSelection = useCallback((id) => {
    if (selection.includes(id)) {
      if (allowUnselected) {
        setSelection((previousSelection) => previousSelection.filter((inSelection) => id !== inSelection));
      } else {
        console.warn("allowUnselected is false. Cannot unselect item");
      }
    } else {
      if (allowMultiple) {
        setSelection((previousSelection) => [...previousSelection, id]);
      } else {
        setSelection([id]);
      }
    }
  }, [items, allowMultiple, selection]);
  const matchSelection = useCallback((id) => {
    return selection.includes(id);
  }, [selection]);
  const resetSelection = () => setSelection([]);
  const selectAll = () => setSelection(items);
  const selectAllBut = (id) => setSelection(items.filter((itm) => itm !== id));
  const output = useMemo(() => selection, [selection]);
  useEffect(() => {
    onChange == null ? void 0 : onChange(output);
  }, [output]);
  return [output, { matchSelection, updateSelection, resetSelection, selectAll, selectAllBut }];
}
const preventDefault = (event) => {
  event.preventDefault();
};
const useScrollLock = (lock, options = { disableTouchEvents: false }) => {
  const locked = useRef(false);
  const bodyOverflow = useRef(null);
  const unlockScroll = () => {
    if (locked.current) {
      locked.current = false;
      document.body.style.overflow = bodyOverflow.current || "";
      if (options.disableTouchEvents) {
        document.body.removeEventListener("touchmove", preventDefault);
      }
    }
  };
  const lockScroll = () => {
    locked.current = true;
    bodyOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (options.disableTouchEvents) {
      document.body.addEventListener("touchmove", preventDefault, {
        passive: false
      });
    }
  };
  useEffect(() => {
    if (lock) {
      lockScroll();
    } else {
      unlockScroll();
    }
    return unlockScroll;
  }, [lock]);
};
var DefaultContext = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
};
var IconContext = React.createContext && React.createContext(DefaultContext);
var __assign = globalThis && globalThis.__assign || function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
      s = arguments[i];
      for (var p2 in s)
        if (Object.prototype.hasOwnProperty.call(s, p2))
          t[p2] = s[p2];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = globalThis && globalThis.__rest || function(s, e) {
  var t = {};
  for (var p2 in s)
    if (Object.prototype.hasOwnProperty.call(s, p2) && e.indexOf(p2) < 0)
      t[p2] = s[p2];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p2 = Object.getOwnPropertySymbols(s); i < p2.length; i++) {
      if (e.indexOf(p2[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p2[i]))
        t[p2[i]] = s[p2[i]];
    }
  return t;
};
function Tree2Element(tree) {
  return tree && tree.map(function(node, i) {
    return React.createElement(node.tag, __assign({
      key: i
    }, node.attr), Tree2Element(node.child));
  });
}
function GenIcon(data) {
  return function(props) {
    return React.createElement(IconBase, __assign({
      attr: __assign({}, data.attr)
    }, props), Tree2Element(data.child));
  };
}
function IconBase(props) {
  var elem = function(conf) {
    var attr = props.attr, size = props.size, title = props.title, svgProps = __rest(props, ["attr", "size", "title"]);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className)
      className = conf.className;
    if (props.className)
      className = (className ? className + " " : "") + props.className;
    return React.createElement("svg", __assign({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className,
      style: __assign(__assign({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && React.createElement("title", null, title), props.children);
  };
  return IconContext !== void 0 ? React.createElement(IconContext.Consumer, null, function(conf) {
    return elem(conf);
  }) : elem(DefaultContext);
}
function FiArrowDown(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "line", "attr": { "x1": "12", "y1": "5", "x2": "12", "y2": "19" } }, { "tag": "polyline", "attr": { "points": "19 12 12 19 5 12" } }] })(props);
}
function FiArrowUp(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "line", "attr": { "x1": "12", "y1": "19", "x2": "12", "y2": "5" } }, { "tag": "polyline", "attr": { "points": "5 12 12 5 19 12" } }] })(props);
}
function FiCheck(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "polyline", "attr": { "points": "20 6 9 17 4 12" } }] })(props);
}
function FiChevronDown(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "polyline", "attr": { "points": "6 9 12 15 18 9" } }] })(props);
}
function FiChevronUp(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "polyline", "attr": { "points": "18 15 12 9 6 15" } }] })(props);
}
function FiCircle(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "circle", "attr": { "cx": "12", "cy": "12", "r": "10" } }] })(props);
}
function FiColumns(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "path", "attr": { "d": "M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18" } }] })(props);
}
function FiFilter(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "polygon", "attr": { "points": "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" } }] })(props);
}
function FiFolder(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "path", "attr": { "d": "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" } }] })(props);
}
function FiHash(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "line", "attr": { "x1": "4", "y1": "9", "x2": "20", "y2": "9" } }, { "tag": "line", "attr": { "x1": "4", "y1": "15", "x2": "20", "y2": "15" } }, { "tag": "line", "attr": { "x1": "10", "y1": "3", "x2": "8", "y2": "21" } }, { "tag": "line", "attr": { "x1": "16", "y1": "3", "x2": "14", "y2": "21" } }] })(props);
}
function FiLink(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "path", "attr": { "d": "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" } }, { "tag": "path", "attr": { "d": "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" } }] })(props);
}
function FiLock(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "rect", "attr": { "x": "3", "y": "11", "width": "18", "height": "11", "rx": "2", "ry": "2" } }, { "tag": "path", "attr": { "d": "M7 11V7a5 5 0 0 1 10 0v4" } }] })(props);
}
function FiMenu(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "line", "attr": { "x1": "3", "y1": "12", "x2": "21", "y2": "12" } }, { "tag": "line", "attr": { "x1": "3", "y1": "6", "x2": "21", "y2": "6" } }, { "tag": "line", "attr": { "x1": "3", "y1": "18", "x2": "21", "y2": "18" } }] })(props);
}
function FiMinus(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "line", "attr": { "x1": "5", "y1": "12", "x2": "19", "y2": "12" } }] })(props);
}
function FiThumbsDown(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "path", "attr": { "d": "M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" } }] })(props);
}
function FiX(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "line", "attr": { "x1": "18", "y1": "6", "x2": "6", "y2": "18" } }, { "tag": "line", "attr": { "x1": "6", "y1": "6", "x2": "18", "y2": "18" } }] })(props);
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
function toObject(val) {
  if (val === null || val === void 0) {
    throw new TypeError("Object.assign cannot be called with null or undefined");
  }
  return Object(val);
}
function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    }
    var test1 = new String("abc");
    test1[5] = "de";
    if (Object.getOwnPropertyNames(test1)[0] === "5") {
      return false;
    }
    var test2 = {};
    for (var i = 0; i < 10; i++) {
      test2["_" + String.fromCharCode(i)] = i;
    }
    var order2 = Object.getOwnPropertyNames(test2).map(function(n2) {
      return test2[n2];
    });
    if (order2.join("") !== "0123456789") {
      return false;
    }
    var test3 = {};
    "abcdefghijklmnopqrst".split("").forEach(function(letter) {
      test3[letter] = letter;
    });
    if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
}
shouldUseNative() ? Object.assign : function(target, source) {
  var from;
  var to = toObject(target);
  var symbols;
  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);
    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);
      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }
  return to;
};
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = React, g = 60103;
reactJsxRuntime_production_min.Fragment = 60107;
if (typeof Symbol === "function" && Symbol.for) {
  var h = Symbol.for;
  g = h("react.element");
  reactJsxRuntime_production_min.Fragment = h("react.fragment");
}
var m = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, n = Object.prototype.hasOwnProperty, p = { key: true, ref: true, __self: true, __source: true };
function q(c, a, k) {
  var b, d = {}, e = null, l = null;
  k !== void 0 && (e = "" + k);
  a.key !== void 0 && (e = "" + a.key);
  a.ref !== void 0 && (l = a.ref);
  for (b in a)
    n.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps)
    for (b in a = c.defaultProps, a)
      d[b] === void 0 && (d[b] = a[b]);
  return { $$typeof: g, type: c, key: e, ref: l, props: d, _owner: m.current };
}
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
const jsx = jsxRuntime.exports.jsx;
const jsxs = jsxRuntime.exports.jsxs;
const Fragment = jsxRuntime.exports.Fragment;
const Icon = (props) => {
  const {
    fill = "var(--accent)",
    variant,
    title
  } = props;
  return /* @__PURE__ */ jsx(Fragment$1, {
    children: {
      circle: /* @__PURE__ */ jsx(FiCircle, {
        size: 16,
        color: fill,
        title: "Column options"
      }),
      lock: /* @__PURE__ */ jsx(FiLock, {
        size: 20,
        color: "var(--accent)",
        title: "Locked row"
      }),
      menu: /* @__PURE__ */ jsx(FiMenu, {
        size: 48,
        color: "var(--accent)",
        title: "Navigation options"
      }),
      folder: /* @__PURE__ */ jsx(FiFolder, {
        size: 18,
        color: "var(--accent)",
        title
      }),
      hash: /* @__PURE__ */ jsx(FiHash, {
        size: 16,
        color: fill,
        title
      }),
      link: /* @__PURE__ */ jsx(FiLink, {
        size: 16,
        color: fill,
        title,
        className: "fx-brightness"
      }),
      up: /* @__PURE__ */ jsx(FiArrowUp, {
        size: 18,
        color: fill,
        title
      }),
      down: /* @__PURE__ */ jsx(FiArrowDown, {
        size: 18,
        color: fill,
        title
      }),
      chevron: /* @__PURE__ */ jsx(FiChevronDown, {
        size: 20,
        color: fill,
        title: "Disclose"
      }),
      chevronUp: /* @__PURE__ */ jsx(FiChevronUp, {
        size: 20,
        color: fill,
        title: "Undisclose"
      }),
      close: /* @__PURE__ */ jsx(FiX, {
        size: 32,
        color: fill,
        title: "Reset options",
        className: "fx-brightness"
      }),
      checkbox: /* @__PURE__ */ jsx(FiCheck, {
        size: 28,
        color: fill,
        title: "Checked",
        className: "fx-brightness"
      }),
      checkboxMixed: /* @__PURE__ */ jsx(FiMinus, {
        size: 28,
        color: fill,
        title: "Indeterminate",
        className: "fx-brightness"
      }),
      columns: /* @__PURE__ */ jsx(FiColumns, {
        size: 22,
        color: fill,
        title: "Visible columns"
      }),
      filters: /* @__PURE__ */ jsx(FiFilter, {
        size: 22,
        color: fill,
        title: "Filter rows"
      })
    }[variant]
  });
};
function SelectItem(props) {
  const {
    onTap,
    description,
    label,
    colId
  } = props;
  const focusManager = useFocusManager();
  const onKeyDown = (event) => {
    const closeKeys = ["Escape", "c"];
    if (closeKeys.includes(event.key))
      ;
    switch (event.key) {
      case "ArrowDown":
        focusManager.focusNext({
          wrap: true
        });
        break;
      case "ArrowUp":
        focusManager.focusPrevious({
          wrap: true
        });
        break;
    }
  };
  return /* @__PURE__ */ jsxs("button", __spreadProps(__spreadValues({
    role: "menuitem"
  }, colId && {
    id: colId
  }), {
    className: clxs("rp-button", "action"),
    onClick: onTap !== void 0 ? onTap : () => ({}),
    onKeyDown,
    children: [/* @__PURE__ */ jsxs("span", {
      "aria-hidden": "true",
      children: [" ", label, " "]
    }), /* @__PURE__ */ jsxs("span", {
      className: "rp-offscreen",
      children: [" ", description]
    })]
  }));
}
function Select(props) {
  const {
    items,
    id,
    label,
    activeFocus
  } = props;
  const [isFocusWithin, setFocusWithin] = useState(activeFocus);
  const {
    focusWithinProps
  } = useFocusWithin({
    onBlurWithin: () => setFocusWithin(false),
    onFocusWithinChange: (isFocusWithin2) => setFocusWithin(isFocusWithin2)
  });
  useScrollLock(isFocusWithin);
  const rootStyles = clxs("rp-select", isFocusWithin && "rp-focused");
  return /* @__PURE__ */ jsxs("div", __spreadProps(__spreadValues({
    className: rootStyles
  }, focusWithinProps), {
    children: [/* @__PURE__ */ jsx("span", {
      className: "rp-offscreen",
      id: `${id}-extra-label`,
      children: "Column Actions"
    }), /* @__PURE__ */ jsxs("button", {
      id,
      className: "rp-button",
      "aria-labelledby": `${id} ${id}-extra-label`,
      "aria-haspopup": "true",
      "aria-controls": `${id}-controls`,
      "aria-expanded": isFocusWithin ? "true" : "false",
      children: [label, /* @__PURE__ */ jsx("div", {
        className: "rp-pushLeft",
        children: /* @__PURE__ */ jsx(Icon, {
          variant: "circle",
          fill: "currentColor"
        })
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "rp-menu",
      children: /* @__PURE__ */ jsx("div", {
        role: "menu",
        id: `${id}-controls`,
        "aria-labelledby": id,
        "aria-orientation": "vertical",
        className: "rp-menuItems",
        children: isFocusWithin ? /* @__PURE__ */ jsx(FocusScope, {
          autoFocus: true,
          children: items == null ? void 0 : items.map((item, position) => /* @__PURE__ */ jsx(SelectItem, __spreadProps(__spreadValues({}, item), {
            colId: `${id}-${item.colId}`
          }), `select-item-${position}`))
        }) : items == null ? void 0 : items.map((item, position) => /* @__PURE__ */ jsx(SelectItem, __spreadValues({}, item), `select-item-${position}`))
      })
    })]
  }));
}
function Disclosure(props) {
  var _a;
  return /* @__PURE__ */ jsx(Popover, {
    className: clxs("rp-popover", (_a = props == null ? void 0 : props.classes) == null ? void 0 : _a.popoverRoot),
    children: ({
      open
    }) => {
      var _a2, _b, _c, _d;
      return /* @__PURE__ */ jsxs(Fragment, {
        children: [/* @__PURE__ */ jsxs(Popover.Button, {
          disabled: (_a2 = props == null ? void 0 : props.disabled) != null ? _a2 : false,
          className: clxs((_b = props == null ? void 0 : props.classes) == null ? void 0 : _b.popoverButton),
          children: [props.label, props.icon && /* @__PURE__ */ jsx("span", {
            className: "rp-iconStable",
            children: /* @__PURE__ */ jsx(Icon, {
              fill: "currentColor",
              variant: !open ? props.icon : props.icon === "chevron" ? `${props.icon}Up` : props.icon
            })
          })]
        }), /* @__PURE__ */ jsx(Popover.Panel, {
          className: clxs("rp-panel", (_d = (_c = props == null ? void 0 : props.classes) == null ? void 0 : _c.popoverContent) != null ? _d : "rp-panel"),
          children: ({
            close
          }) => /* @__PURE__ */ jsxs(Fragment$1, {
            children: [props.trap !== void 0 ? /* @__PURE__ */ jsxs(FocusScope, {
              autoFocus: true,
              children: [" ", props.children]
            }) : props.children, " "]
          })
        })]
      });
    }
  });
}
const CheckBox = (props) => {
  const {
    children,
    checked = false,
    onChange,
    value,
    name,
    label,
    id,
    disabled
  } = props;
  const handleChange = (event) => {
    onChange == null ? void 0 : onChange(event);
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "rp-checkbox",
    children: [checked && checked !== "mixed" && /* @__PURE__ */ jsx(Icon, {
      variant: "checkbox",
      fill: "var(--accent)"
    }), checked && checked === "mixed" && /* @__PURE__ */ jsx(Icon, {
      variant: "checkboxMixed"
    }), /* @__PURE__ */ jsxs("label", {
      htmlFor: name,
      children: [/* @__PURE__ */ jsx(CustomCheckbox, __spreadValues(__spreadValues({
        value,
        name,
        checked,
        onChange: handleChange,
        "aria-label": label
      }, id && {
        id
      }), disabled && {
        disabled
      })), children]
    })]
  });
};
function Container(props) {
  const {
    children,
    id,
    rows,
    cols,
    label,
    description
  } = props;
  return /* @__PURE__ */ jsx("div", {
    id,
    role: "grid",
    "aria-describedby": description,
    "aria-labelledby": label,
    "aria-rowcount": rows,
    "aria-colcount": cols,
    "aria-multiselectable": "true",
    children
  });
}
function Cell(props) {
  var _a, _b, _c;
  const {
    position,
    classes,
    children,
    width,
    align,
    role,
    selected,
    editable = false,
    labelledBy,
    className,
    expandable = false,
    disclosee
  } = props;
  const isExpandable = expandable && identity(disclosee) && !isObjectEmpty(disclosee);
  return /* @__PURE__ */ jsx("div", __spreadProps(__spreadValues({
    className: clxs("rp-cell", className),
    role,
    "aria-colindex": position + 1,
    "aria-selected": selected,
    style: {
      width,
      justifyContent: align
    },
    "aria-readonly": editable ? "true" : "false"
  }, labelledBy && {
    "aria-labelledby": labelledBy
  }), {
    children: isExpandable ? /* @__PURE__ */ jsx(Disclosure, {
      label: children,
      icon: "chevron",
      classes: {
        popoverRoot: (_a = classes == null ? void 0 : classes.popoverRootExpandable) != null ? _a : "rp-root-expandable",
        popoverButton: (_b = classes == null ? void 0 : classes.popoverButtonExpandable) != null ? _b : "rp-expandable",
        popoverContent: (_c = classes == null ? void 0 : classes.popoverContentExpandable) != null ? _c : "rp-popContent"
      },
      children: Object.entries(disclosee).map(([k, v]) => {
        const isBoolean = typeof v === "boolean";
        const isArray = Array.isArray(v);
        const value = isBoolean ? /* @__PURE__ */ jsx("p", {
          children: capitalize(v.toString())
        }) : isArray ? /* @__PURE__ */ jsx("div", {
          className: "rp-colGap rp-rowGapGrid",
          children: v.map((record, pos) => /* @__PURE__ */ jsxs("p", {
            children: [" ", record, " "]
          }, `expando-content${pos}`))
        }) : v;
        return /* @__PURE__ */ jsxs("div", {
          className: "rp-colGap rp-rowGapGrid",
          children: [/* @__PURE__ */ jsxs("p", {
            children: [/* @__PURE__ */ jsx("b", {
              children: capitalize(k.toString())
            }), ":"]
          }), " ", value]
        }, k);
      })
    }) : children
  }));
}
const Field = forwardRef((props, ref) => {
  const {
    className,
    value,
    label,
    placeholder = null,
    name,
    autocapitalize = "none",
    autocomplete = "off",
    inputmode = "text",
    enterkeyhint,
    autofocus = false,
    required = true,
    type = "text",
    onBlur,
    onChange
  } = props;
  const handleChange = (event) => {
    if (onChange) {
      onChange == null ? void 0 : onChange(event);
    }
  };
  const rootStyles = clxs("rp-field", className);
  return /* @__PURE__ */ jsxs(Fragment$1, {
    children: [/* @__PURE__ */ jsx("label", {
      htmlFor: "row-picker-field",
      className: "rp-offscreen",
      children: label
    }), /* @__PURE__ */ jsx("input", __spreadProps(__spreadValues({
      id: "row-picker-field",
      className: rootStyles,
      ref,
      defaultValue: value,
      name,
      autoComplete: autocomplete,
      "aria-required": !!required,
      "aria-label": label,
      autoFocus: autofocus,
      enterKeyHint: enterkeyhint,
      inputMode: inputmode,
      type,
      onChange: handleChange,
      onBlur,
      autoCapitalize: autocapitalize
    }, placeholder && {
      placeholder
    }), {
      dir: "auto"
    }))]
  });
});
function CellEditable(props) {
  const {
    row,
    label,
    value,
    setValue
  } = props;
  const [editingValue, setEditingValue] = useState(value);
  const onChange = (event) => setEditingValue(event.target.value);
  const onKeyDown = (event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.target.blur();
    }
  };
  const onBlur = (event) => {
    if (event.target.value.trim() === "")
      return;
    setValue(__spreadProps(__spreadValues({}, row), {
      [label]: event.target.value
    }));
  };
  return /* @__PURE__ */ jsx(Field, {
    className: "rp-editable",
    label,
    name: label,
    value: editingValue,
    onChange,
    onKeyDown,
    onBlur
  });
}
function Header(props) {
  const {
    children,
    width,
    align,
    id,
    value,
    activeSorter,
    className
  } = props;
  let ariaSortProps = {};
  if (activeSorter !== void 0) {
    const {
      property,
      isDescending
    } = activeSorter;
    if (activeSorter.property !== void 0 && property === value) {
      ariaSortProps = {
        "aria-sort": !isDescending ? "ascending" : "descending"
      };
    }
  }
  return /* @__PURE__ */ jsx("div", __spreadProps(__spreadValues({
    id,
    className: clxs("rp-cell", className),
    role: "columnheader",
    style: {
      width,
      justifyContent: align
    }
  }, ariaSortProps), {
    children
  }));
}
function Body(props) {
  return /* @__PURE__ */ jsx("div", {
    className: "rp-body",
    role: "rowgroup",
    children: props.children
  });
}
function BodyRow(props) {
  const {
    children,
    position,
    disabled,
    selected
  } = props;
  const {
    hoverProps,
    isHovered
  } = useHover({
    onHoverStart: () => ({}),
    onHoverEnd: () => ({})
  });
  return /* @__PURE__ */ jsxs("div", __spreadProps(__spreadValues({
    className: clxs("rp-row", isHovered && "rp-zebra", disabled && "rp-rowDisabled", selected && "rp-rowSelected"),
    role: "row",
    "aria-rowindex": position + 1
  }, hoverProps), {
    children: [disabled ? /* @__PURE__ */ jsx("span", {
      className: "rp-lock",
      children: /* @__PURE__ */ jsx(Icon, {
        variant: "lock"
      })
    }) : /* @__PURE__ */ jsx(Fragment$1, {}), children]
  }));
}
function HeaderRow(props) {
  return /* @__PURE__ */ jsx("div", {
    className: "rp-row",
    role: "row",
    children: props.children
  });
}
function HeaderRowGroup(props) {
  return /* @__PURE__ */ jsx("div", {
    className: "rp-header",
    role: "rowgroup",
    children: props.children
  });
}
function Switch(props) {
  const {
    row,
    initial,
    label,
    setValue,
    className
  } = props;
  const [on, setOn] = useState(initial);
  useEffect(() => {
    setValue(__spreadProps(__spreadValues({}, row), {
      [label]: on
    }));
  }, [on]);
  return /* @__PURE__ */ jsx("div", {
    className: clxs("rp-switch", on && className ? className : "rp-switch-on"),
    children: /* @__PURE__ */ jsxs("button", {
      type: "button",
      "aria-pressed": on ? "true" : "false",
      onClick: () => setOn((prev) => !prev),
      children: [/* @__PURE__ */ jsx("span", {
        className: "rp-offscreen",
        children: label
      }), /* @__PURE__ */ jsx(FiThumbsDown, {
        size: 16,
        className: clxs("rp-switchIcon", on && "rp-switchIconOn")
      }), " "]
    })
  });
}
var RowPicker$1 = "";
var theme = "";
function RowPicker(props) {
  var _a, _b, _c, _d, _e;
  const {
    classes,
    id,
    label,
    description,
    rows,
    columns,
    allColumns,
    expandableColumn,
    totalCols,
    loading,
    activeSorter,
    onFilter,
    onReset,
    onSort,
    onColChange,
    onCellChange,
    onRowChange,
    toolbar
  } = props;
  const [selectedCheckBoxes, {
    matchSelection: matchSelectionCheckBoxes,
    updateSelection: updateSelectionCheckBoxes,
    resetSelection: resetSelectionCheckBoxes,
    selectAll
  }] = useSelectable(rows.map((r) => r.id), null, void 0, true, true);
  const allCheckBoxesChecked = selectedCheckBoxes.length === rows.length;
  const someCheckBoxesChecked = has(selectedCheckBoxes) && selectedCheckBoxes.length < rows.length;
  const parentIsChecked = allCheckBoxesChecked ? true : someCheckBoxesChecked ? "mixed" : false;
  const onParentChange = () => {
    if (has(selectedCheckBoxes)) {
      resetSelectionCheckBoxes();
    } else {
      selectAll();
    }
  };
  const onChildChange = (id2) => {
    updateSelectionCheckBoxes(id2);
  };
  const selectedCheckBoxesRows = useMemo(() => {
    let picked = [];
    rows == null ? void 0 : rows.map((row) => {
      if (selectedCheckBoxes.includes(row.id)) {
        picked.push(row);
      }
    });
    return picked;
  }, [selectedCheckBoxes, rows]);
  useEffect(() => {
    onRowChange(selectedCheckBoxesRows);
  }, [selectedCheckBoxesRows]);
  const filterableKeys = useRef([]);
  useEffect(() => {
    let picked = [];
    if (!isObjectEmpty(rows[0])) {
      Object.entries(rows[0]).map(([value, state]) => {
        if (typeof state === "boolean") {
          picked.push(value);
        }
      });
      filterableKeys.current = picked;
    }
  }, []);
  const [selectionFilters, {
    matchSelection: matchSelectionFilters,
    updateSelection: updateSelectionFilters
  }] = useSelectable(filterableKeys.current, null, () => onFilter(filters), true, false);
  const filters = useMemo(() => {
    var _a2;
    let picked = [];
    (_a2 = filterableKeys.current) == null ? void 0 : _a2.map((filter, pos) => {
      if (selectionFilters.includes(pos.toString())) {
        picked.push(filter);
      }
    });
    return picked.map((pick) => ({
      property: pick,
      isTruthyPicked: true
    }));
  }, [selectionFilters]);
  const [selectionVisible, {
    updateSelection,
    matchSelection,
    selectAllBut
  }] = useSelectable(columns == null ? void 0 : columns.slice(1, columns.length).map((c) => c.id), null, (newVisibleCols) => onColChange(newVisibleCols), true, true);
  const {
    property,
    isDescending
  } = activeSorter;
  const showReset = columns.length < totalCols || has(filters);
  const [rowCellEditing, setNewCell] = useState(null);
  const onNewCell = (row) => {
    setNewCell(row);
  };
  useEffect(() => {
    if (identity(rowCellEditing)) {
      onCellChange == null ? void 0 : onCellChange(rowCellEditing);
    }
  }, [rowCellEditing]);
  const rowPickerIdealWidth = useMemo(() => {
    return columns.map((col) => Number(col.width.replace("px", ""))).reduce((acc, val) => {
      return acc + val;
    }, 60);
  }, [columns]);
  return /* @__PURE__ */ jsxs("div", {
    className: clxs(classes == null ? void 0 : classes.root, "rp-outer"),
    children: [isValidElement(toolbar) ? toolbar : /* @__PURE__ */ jsxs("div", {
      className: "rp-toolbar",
      children: [/* @__PURE__ */ jsx(Disclosure, {
        icon: "chevron",
        disabled: !has(selectedCheckBoxesRows),
        label: `${selectedCheckBoxesRows.length < 10 ? "0" : ""}${selectedCheckBoxesRows.length} Row${selectedCheckBoxesRows.length > 1 ? "s" : " "} `,
        classes: {
          popoverContent: (_a = classes == null ? void 0 : classes.popoverRoot) != null ? _a : "rp-popContent",
          popoverButton: (_b = classes == null ? void 0 : classes.popoverButton) != null ? _b : "rp-popButton rp-cell-number"
        },
        children: /* @__PURE__ */ jsx("div", {
          className: "rp-rowGap rp-rowGapGrid rp-space-b",
          children: selectedCheckBoxesRows.map((check) => {
            var _a2, _b2, _c2;
            return /* @__PURE__ */ jsx("button", {
              type: "button",
              className: clxs(classes == null ? void 0 : classes.popoverAction),
              onClick: () => selectedCheckBoxesRows.length > 1 ? updateSelectionCheckBoxes(check.id) : {},
              children: (_c2 = (_b2 = (_a2 = check == null ? void 0 : check.name) != null ? _a2 : check == null ? void 0 : check.title) != null ? _b2 : check == null ? void 0 : check.instagram) != null ? _c2 : check.id
            }, check.id);
          })
        })
      }), /* @__PURE__ */ jsxs(Disclosure, {
        label: "",
        icon: "columns",
        classes: {
          popoverContent: (_c = classes == null ? void 0 : classes.popoverRoot) != null ? _c : "rp-popContent",
          popoverButton: (_d = classes == null ? void 0 : classes.popoverButton) != null ? _d : "rp-popButton rp-popButtonIcon"
        },
        children: [/* @__PURE__ */ jsx("div", {
          className: "rp-rowGap rp-rowGapGrid rp-space-b",
          children: allColumns == null ? void 0 : allColumns.map((col, pos) => same(pos, 0) ? /* @__PURE__ */ jsx(Fragment$1, {}, pos) : /* @__PURE__ */ jsx("button", {
            type: "button",
            className: clxs(matchSelection(col.id) && (classes == null ? void 0 : classes.popoverActionSelected), classes == null ? void 0 : classes.popoverAction),
            onClick: () => updateSelection(col.id),
            children: col.label
          }, col.value))
        }), /* @__PURE__ */ jsx("p", {
          children: "Select columns to display."
        })]
      }), showReset ? /* @__PURE__ */ jsx("button", {
        type: "button",
        className: "rp-buttonIcon",
        onClick: () => {
          resetSelectionCheckBoxes();
          onReset();
        },
        children: /* @__PURE__ */ jsx(Icon, {
          variant: "close",
          fill: "var(--accent)"
        })
      }) : /* @__PURE__ */ jsx(Fragment$1, {})]
    }), /* @__PURE__ */ jsx("div", {
      "aria-busy": loading ? "true" : "false",
      className: clxs("rp-root", classes == null ? void 0 : classes.root, (_e = loading && (classes == null ? void 0 : classes.loading)) != null ? _e : "rp-row-picker-loading"),
      style: {
        minWidth: `${rowPickerIdealWidth}px`
      },
      children: /* @__PURE__ */ jsxs(Container, {
        id,
        description,
        label,
        rows: rows.length,
        cols: columns.length,
        children: [!loading && /* @__PURE__ */ jsx(HeaderRowGroup, {
          children: /* @__PURE__ */ jsx(HeaderRow, {
            children: columns == null ? void 0 : columns.map((col) => {
              if (same(col.value, "pick")) {
                return /* @__PURE__ */ jsx(Header, {
                  id: col.value,
                  width: "60px",
                  align: "center",
                  className: "rp-sticky",
                  children: /* @__PURE__ */ jsx(CheckBox, {
                    id: `${id}-select-all-rows`,
                    label: "select-all-rows",
                    name: "select-all-rows",
                    value: "select-all-rows",
                    checked: parentIsChecked,
                    onChange: onParentChange
                  })
                }, col.value);
              }
              const isUnsortable = col.variant && col.variant !== "default";
              const selectItems = [{
                id: 0,
                label: "Asc",
                description: `Set column ${col.value} in ascending sort order.`,
                onTap: () => onSort({
                  isDescending: false,
                  property: col.value
                })
              }, {
                id: 1,
                label: "Desc",
                description: `Set column ${col.value} in descending sort order.`,
                onTap: () => onSort({
                  isDescending: true,
                  property: col.value
                })
              }, {
                id: 3,
                colId: `${id}-${col.value}`,
                label: "Focus",
                description: "Hide other columns",
                onTap: () => {
                  updateSelection(col.id);
                }
              }, {
                id: 4,
                colId: `${id}-${col.value}`,
                label: "Hide",
                description: "Hide this column",
                onTap: () => {
                  selectAllBut(col.id);
                }
              }];
              return /* @__PURE__ */ jsx(Header, __spreadProps(__spreadValues({}, col), {
                activeSorter,
                children: /* @__PURE__ */ jsx(Select, {
                  activeFocus: false,
                  id: `${col.value}-${id}`,
                  label: /* @__PURE__ */ jsxs(Fragment$1, {
                    children: [col.label, " ", same(property, col.value) && /* @__PURE__ */ jsx("span", {
                      className: "rp-iconStable",
                      children: /* @__PURE__ */ jsx(Icon, {
                        variant: same(property, col.value) && isDescending ? "down" : "up",
                        fill: "currentColor"
                      })
                    })]
                  }),
                  items: isUnsortable ? selectItems.slice(2, 4) : selectItems
                })
              }), col.value);
            })
          })
        }), /* @__PURE__ */ jsxs(Body, {
          children: [!loading && has(rows) && (rows == null ? void 0 : rows.map((row, pos) => {
            var _a2, _b2;
            return /* @__PURE__ */ jsxs(BodyRow, {
              selected: matchSelectionCheckBoxes(row.id),
              position: pos,
              disabled: (_a2 = row == null ? void 0 : row.locked) != null ? _a2 : false,
              children: [/* @__PURE__ */ jsx(Cell, {
                position: pos,
                selected: matchSelectionCheckBoxes(row.id),
                role: "gridcell",
                width: "60px",
                align: "center",
                editable: true,
                labelledBy: `${id}-checkbox-${row.id}`,
                className: "rp-sticky",
                children: /* @__PURE__ */ jsx(CheckBox, {
                  label: `select row ${row.id}`,
                  name: `select row ${row.id}`,
                  value: row.id.toString(),
                  checked: matchSelectionCheckBoxes(row.id) && !(row == null ? void 0 : row.locked),
                  onChange: () => onChildChange(row.id),
                  disabled: (_b2 = row == null ? void 0 : row.locked) != null ? _b2 : false
                })
              }), columns.filter((col) => col.value !== "pick").map((col, posCol) => {
                var _a3, _b3;
                const colContent = row[col.value];
                const isBoolean = typeof row[col.value] === "boolean";
                const colContentWithFormat = identity(col.formatter) ? col.formatter(colContent) : /* @__PURE__ */ jsx("span", {
                  dir: "auto",
                  className: !/[^0-9]/.test(colContent.toString()) ? "rp-cell-number" : "",
                  children: colContent.toString()
                });
                const isEditableCol = (_b3 = same((_a3 = col == null ? void 0 : col.variant) != null ? _a3 : "default", "isEditable")) != null ? _b3 : false;
                const hasChildren = !isObjectEmpty(row == null ? void 0 : row.children);
                if (isEditableCol) {
                  return /* @__PURE__ */ jsx(Cell, __spreadProps(__spreadValues({}, col), {
                    role: same(posCol, 0) ? "rowheader" : "gridcell",
                    position: posCol,
                    selected: false,
                    editable: true,
                    children: /* @__PURE__ */ jsx(CellEditable, {
                      row,
                      label: col.value,
                      value: colContent,
                      setValue: onNewCell
                    })
                  }), col.value);
                }
                if (isBoolean && !identity(col.formatter)) {
                  const active = same(colContent.toString(), "true");
                  return /* @__PURE__ */ jsx(Cell, __spreadProps(__spreadValues({}, col), {
                    role: same(posCol, 0) ? "rowheader" : "gridcell",
                    position: posCol,
                    selected: false,
                    editable: false,
                    children: /* @__PURE__ */ jsx(Switch, {
                      row,
                      setValue: onNewCell,
                      initial: active,
                      label: col.value,
                      className: classes == null ? void 0 : classes.switchOn
                    })
                  }), col.value);
                }
                return /* @__PURE__ */ jsx(Cell, __spreadProps(__spreadValues({}, col), {
                  role: same(posCol, 0) ? "rowheader" : "gridcell",
                  id: same(posCol, 0) ? `${id}-${col.value}-${row.id}-${posCol}` : void 0,
                  position: posCol,
                  selected: false,
                  editable: false,
                  classes,
                  expandable: same(posCol, expandableColumn),
                  disclosee: hasChildren ? row == null ? void 0 : row.children : null,
                  children: /* @__PURE__ */ jsx(Fragment$1, {
                    children: colContentWithFormat
                  })
                }), col.value);
              })]
            }, row.id);
          })), !loading && !has(rows) && /* @__PURE__ */ jsx("div", {
            className: "rp-row",
            children: /* @__PURE__ */ jsx("b", {
              children: "No results."
            })
          })]
        })]
      })
    })]
  });
}
const initialSortState = {
  property: "id",
  isDescending: false
};
const initialFilterState = [];
function useRowPicker(props) {
  const {
    id,
    label,
    description,
    classes,
    columns = [],
    expandableColumn = 99,
    rows = [],
    filters = initialFilterState,
    sorters = initialSortState,
    toolbar,
    loading = false
  } = props;
  const [searchResults, setResults] = useState(rows);
  const gridRows = useMemo(() => {
    return searchResults;
  }, [searchResults]);
  const [activeSorter, setActiveSorter] = useState(sorters);
  const [activeFilters, setActiveFilters] = useState(filters);
  const [activeCols, setCols] = useState([]);
  const [selectedRows, setRows] = useState([]);
  const [newCellContent, setNewCell] = useState(null);
  useEffect(() => {
    const results = rows.filter((widget) => genericFilter(widget, activeFilters)).sort((widgetA, widgetB) => genericSort(widgetA, widgetB, activeSorter));
    setResults(results);
  }, [activeSorter, activeFilters, rows]);
  const visibleColumns = useMemo(() => {
    let picked = [columns[0]];
    if (has(activeCols)) {
      columns.filter((col) => {
        if (activeCols.includes(col.id)) {
          picked.push(col);
        }
      });
      return picked;
    }
    return columns;
  }, [columns, activeCols]);
  useEffect(() => {
    if (identity(newCellContent)) {
      new Timer(() => setNewCell(null), 200);
    }
  }, [newCellContent]);
  const onFilter = (filters2) => setActiveFilters(filters2);
  const onSort = (sort) => setActiveSorter(sort);
  const onColChange = (cols) => setCols(cols);
  const onRowChange = (rows2) => setRows(rows2);
  const onChangeCell = (newCell) => setNewCell(newCell);
  const onReset = () => {
    setActiveFilters(initialFilterState);
    setActiveSorter(initialSortState);
    setRows([]);
    setResults(rows);
    setCols([]);
  };
  const component = /* @__PURE__ */ jsx(RowPicker, {
    columns: visibleColumns,
    allColumns: columns,
    expandableColumn,
    rows: gridRows,
    totalRows: rows.length,
    totalCols: columns.length,
    activeSorter,
    onFilter,
    onReset,
    onSort,
    onColChange,
    onRowChange,
    onCellChange: onChangeCell,
    classes,
    loading,
    id,
    label,
    description,
    toolbar
  });
  return {
    component,
    results: searchResults,
    resultsFilters: activeFilters,
    resultsSorters: activeSorter,
    resultsSelectedRows: selectedRows,
    resultsNewCell: newCellContent
  };
}
export { useRowPicker as default };
