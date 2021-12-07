// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/mySnabbdom/vnode.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(sel, data, children, text, elm) {
  var key = data.key;
  return {
    sel: sel,
    data: data,
    children: children,
    text: text,
    elm: elm,
    key: key
  };
}
},{}],"src/mySnabbdom/h.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _vnode = _interopRequireDefault(require("./vnode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _default(sel, data, c) {
  if (arguments.length !== 3) {
    throw new Error('参数必须为3');
  } //检查参数c的类型


  if (typeof c == 'string' || typeof c == 'number') {
    return (0, _vnode.default)(sel, data, undefined, c, undefined);
  } else if (Array.isArray(c)) {
    //嵌套h函数
    var children = [];

    for (var i = 0; i < c.length; i++) {
      if (!_typeof(c[i]) == "object" && c[i].hasOwnProperty('sel')) {
        throw new Error('传入的数组参数中有项不是h函数');
      }

      children.push(c[i]);
    }

    return (0, _vnode.default)(sel, data, children, undefined, undefined);
  } else if (_typeof(c) == "object" && c.hasOwnProperty('sel')) {
    var _children = [c];
    return (0, _vnode.default)(sel, data, _children, undefined, undefined);
  } else {
    throw new Error('传入的第三个参数类型不对');
  }
}
},{"./vnode":"src/mySnabbdom/vnode.js"}],"src/mySnabbdom/createElement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createElement;

function createElement(vnode) {
  var domNode = document.createElement(vnode.sel); //创建一个空节点

  if (vnode.text !== '' && (vnode.children == undefined || vnode.children.length == 0)) {
    //是文字
    domNode.innerText = vnode.text;
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    //内部子节点，递归调用，遇到文本不递归
    for (var i = 0; i < vnode.children.length; i++) {
      var ch = vnode.children[i];
      var chDom = createElement(ch);
      domNode.appendChild(chDom);
    }
  } //补充elm属性


  vnode.elm = domNode; //返回elm， elm是一个纯DOM对象

  return vnode.elm;
}
},{}],"src/mySnabbdom/updateChildren.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateChildren;

var _createElement = _interopRequireDefault(require("./createElement"));

var _patch = _interopRequireDefault(require("./patch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateChildren(parentElm, oldCh, newCh) {
  // 四个指针
  // 旧前
  var oldStartIdx = 0; // 新前

  var newStartIdx = 0; // 旧后

  var oldEndIdx = oldCh.length - 1; // 新后

  var newEndIdx = newCh.length - 1; // 指针指向的四个节点
  // 旧前节点

  var oldStartVnode = oldCh[0]; // 旧后节点

  var oldEndVnode = oldCh[oldEndIdx]; // 新前节点

  var newStartVnode = newCh[0]; // 新后节点

  var newEndVnode = newCh[newEndIdx]; //map映射

  var keyMap = null;

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 首先应该不是判断四种命中，而是略过已经加了undefined标记的项
    if (oldCh[oldStartIdx] === undefined) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (oldCh[oldEndIdx] === undefined) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (newCh[newStartIdx] === undefined) {
      newStartVnode = newCh[++newStartIdx];
    } else if (newCh[newEndIdx] === undefined) {
      newEndVnode = newCh[--newEndIdx];
    } else if (checkSameVnode(oldStartVnode, newStartVnode)) {
      // 新前与旧前
      console.log("新前与旧前命中"); // 精细化比较两个节点 oldStartVnode现在和newStartVnode一样了

      (0, _patch.default)(oldStartVnode, newStartVnode); // 移动指针，改变指针指向的节点，这表示这两个节点都处理（比较）完了

      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
      // 新后与旧后
      console.log("新后与旧后命中");
      (0, _patch.default)(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
      // 新后与旧前
      console.log("新后与旧前命中");
      (0, _patch.default)(oldStartVnode, newEndVnode); // 当③新后与旧前命中的时候，此时要移动节点。移动 新后（旧前） 指向的这个节点到老节点的 旧后的后面
      // 移动节点：只要插入一个已经在DOM树上 的节点，就会被移动

      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
      // 新前与旧后
      console.log("新前与旧后命中");
      (0, _patch.default)(oldEndVnode, newStartVnode); // 当④新前与旧后命中的时候，此时要移动节点。移动 新前（旧后） 指向的这个节点到老节点的 旧前的前面
      // 移动节点：只要插入一个已经在DOM树上的节点，就会被移动

      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      // 四种都没有匹配到，都没有命中
      console.log("四种都没有命中"); // 寻找 keyMap 一个映射对象， 就不用每次都遍历old对象了

      if (!keyMap) {
        keyMap = {}; // 记录oldVnode中的节点出现的key
        // 从oldStartIdx开始到oldEndIdx结束，创建keyMap

        for (var i = oldStartIdx; i <= oldEndIdx; i++) {
          var key = oldCh[i].key;

          if (key !== undefined) {
            keyMap[key] = i;
          }
        }
      } // 寻找当前项（newStartIdx）在keyMap中映射的序号


      var idxInOld = keyMap[newStartVnode.key];

      if (idxInOld === undefined) {
        // 如果 idxInOld 是 undefined 说明是全新的项，要插入
        // 被加入的项（就是newStartVnode这项)现不是真正的DOM节点
        parentElm.insertBefore((0, _createElement.default)(newStartVnode), oldStartVnode.elm);
      } else {
        // 说明不是全新的项，要移动
        var elmToMove = oldCh[idxInOld];
        (0, _patch.default)(elmToMove, newStartVnode); // 把这项设置为undefined，表示我已经处理完这项了

        oldCh[idxInOld] = undefined; // 移动，调用insertBefore也可以实现移动。

        parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm);
      } // newStartIdx++;


      newStartVnode = newCh[++newStartIdx];
    }
  } // 循环结束


  if (newStartIdx <= newEndIdx) {
    // 说明newVndoe还有剩余节点没有处理，所以要添加这些节点
    // // 插入的标杆
    // const before =
    //   newCh[newEndIdx + 1] === null ? null : newCh[newEndIdx + 1].elm;
    for (var _i = newStartIdx; _i <= newEndIdx; _i++) {
      // insertBefore方法可以自动识别null，如果是null就会自动排到队尾，和appendChild一致
      parentElm.insertBefore((0, _createElement.default)(newCh[_i]), null);
    }
  } else if (oldStartIdx <= oldEndIdx) {
    // 说明oldVnode还有剩余节点没有处理，所以要删除这些节点
    for (var _i2 = oldStartIdx; _i2 <= oldEndIdx; _i2++) {
      if (oldCh[_i2]) {
        parentElm.removeChild(oldCh[_i2].elm);
      }
    }
  }
} // 判断是否是同一个节点


function checkSameVnode(a, b) {
  return a.sel === b.sel && a.key === b.key;
}
},{"./createElement":"src/mySnabbdom/createElement.js","./patch":"src/mySnabbdom/patch.js"}],"src/mySnabbdom/patch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _createElement = _interopRequireDefault(require("./createElement"));

var _vnode = _interopRequireDefault(require("./vnode"));

var _updateChildren = _interopRequireDefault(require("./updateChildren"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(oldVnode, newVnode) {
  //判断传入的第一个参数，是DOM节点还是虚拟节点
  if (oldVnode.sel == '' || oldVnode.sel == undefined) {
    //传入的第一个参数是DOM节点，此时要包装为虚拟节点
    oldVnode = (0, _vnode.default)(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode);
  } //判断oldVnode和newVnode是不是同一个节点


  if (oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel) {
    //判断是不是同一个对象
    if (oldVnode == newVnode) return; //判断新vnode有没有text属性

    if (newVnode.text !== undefined && (newVnode.children == undefined || newVnode.children.length == 0)) {
      //新vnode只有text属性
      if (newVnode.text != oldVnode.text) {
        //新虚拟节点和老虚拟节点的text不同直接替换掉
        oldVnode.elm.innerText = newVnode.text;
      }
    } else {
      //新vnode没有text属性，表示有children属性，挂有子节点
      if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
        //老的有children,复杂情况
        (0, _updateChildren.default)(oldVnode.elm, oldVnode.children, newVnode.children);
      } else {
        //老的没有children，新的有children
        //清空老的节点内容
        oldVnode.elm.innerHTML = ''; //遍历新的vbode的子节点，创建dom上树

        for (var i = 0; i < newVnode.children.length; i++) {
          var dom = (0, _createElement.default)(newVnode.children[i]);
          oldVnode.elm.appendChild(dom);
        }
      }
    }
  } else {
    var newVnodeElm = (0, _createElement.default)(newVnode); //插入到老节点之前

    if (oldVnode.elm.parentNode !== undefined && newVnodeElm) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm);
    }

    oldVnode.elm.parentNode.removeChild(oldVnode.elm);
  }
}
},{"./createElement":"src/mySnabbdom/createElement.js","./vnode":"src/mySnabbdom/vnode.js","./updateChildren":"src/mySnabbdom/updateChildren.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _h = _interopRequireDefault(require("./mySnabbdom/h"));

var _patch = _interopRequireDefault(require("./mySnabbdom/patch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vnode = (0, _h.default)('h1', {}, [(0, _h.default)('ul', {
  key: 1
}, [(0, _h.default)('li', {
  key: 'C'
}, 'C'), (0, _h.default)('li', {
  key: 'D'
}, 'D')]), (0, _h.default)('div', {
  key: 2
}, '2'), (0, _h.default)('div', {
  key: 3
}, '3')]);
var oldVnode = document.querySelector('#app');
(0, _patch.default)(oldVnode, vnode);
var vnode1 = (0, _h.default)('h1', {}, [(0, _h.default)('div', {
  key: 3
}, '3'), (0, _h.default)('div', {
  key: 'B'
}, 'B'), (0, _h.default)('div', {
  key: 'A'
}, 'A'), (0, _h.default)('div', {
  key: 4
}, '4')]);
setTimeout(function () {
  (0, _patch.default)(vnode, vnode1);
}, 2000);
console.log(vnode1); // const vnode2 = h('h1',{},[
//   h('div',{key: 3},'3'),
//   h('div',{key: 'B'},'B'),
//   h('div',{key: 'C'},'C'),
//   h('div',{key: 'A'},'A'),
//   h('div',{key: 4},'4')
// ])
// setTimeout(()=>{
//   patch(vnode1,vnode2)
// },3000)
},{"./mySnabbdom/h":"src/mySnabbdom/h.js","./mySnabbdom/patch":"src/mySnabbdom/patch.js"}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49597" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map