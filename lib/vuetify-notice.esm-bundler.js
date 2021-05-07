/** Bundle of @nextgis/vuetify-notice; version: 0.0.0; author: rendrom@gmail.com */
import { VCard, VCardActions, VCardText, VDialog, VIcon, VToolbar, VToolbarTitle, VSpacer, VBtn, VSnackbar } from 'vuetify/lib';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/**
 * Thrown when consumer tries to connect when he already connected.
 */
var CancelError = /** @class */ (function (_super) {
    __extends(CancelError, _super);
    function CancelError() {
        var _this = _super.call(this) || this;
        _this.name = 'CancelError';
        Object.setPrototypeOf(_this, CancelError.prototype);
        return _this;
    }
    return CancelError;
}(Error));

var handleCallback = function (resolve, reject, callback, r) {
    try {
        resolve(callback(r));
    }
    catch (e) {
        reject(e);
    }
};
var ID = 0;
/**
 * Promise that can be canceled
 *
 * @example
 * ```
 * import CancelablePromise from "@nextgis/cancelable-promise";
 *
 * const promise = new CancelablePromise((resolve, reject) => {
 *  setTimeout(() => resolve(), 100);
 * }).catch((er) => {
 *  if (er.name === "CancelError") {
 *    // handle cancel error
 *  }
 *  throw er;
 * });
 *
 * promise.cancel();
 * ```
 * @public
 */
var CancelablePromise = /** @class */ (function () {
    function CancelablePromise(executor) {
        var _this = this;
        this.id = ID++;
        this._isCanceled = false;
        this._isPending = true;
        this._cancelHandlers = [];
        this._children = [];
        this._cancelPromise = new Promise(function (resolve_, reject_) {
            _this._setCanceledCallback = function (er) { return resolve_(er || new CancelError()); };
        });
        this._promise = Promise.race([
            this._cancelPromise,
            new Promise(function (resolve, reject) {
                var onResolve = function (value) {
                    if (value instanceof CancelablePromise) {
                        _this.attach(value);
                    }
                    else {
                        _this._isPending = false;
                    }
                    resolve(value);
                };
                var onReject = function (error) {
                    _this._isPending = false;
                    reject(error);
                };
                var onCancel = function (handler) {
                    if (!_this._isPending) {
                        throw new Error('The `onCancel` handler was attached after the promise settled.');
                    }
                    _this._cancelHandlers.push(handler);
                };
                return executor(onResolve, onReject, onCancel);
            }),
        ]);
    }
    CancelablePromise.resolve = function (value) {
        return new CancelablePromise(function (resolve) { return resolve(value); });
    };
    CancelablePromise.reject = function (value) {
        return new CancelablePromise(function (resolve, reject) { return reject(value); });
    };
    CancelablePromise.all = function (values) {
        return new CancelablePromise(function (resolve, reject) {
            Promise.all(values).then(resolve).catch(reject);
        });
    };
    CancelablePromise.prototype.attach = function (p) {
        if (this._isCanceled) {
            p.cancel();
        }
        else {
            this._children.push(p);
        }
    };
    CancelablePromise.prototype.then = function (onfulfilled, onrejected) {
        var _this = this;
        var p = new CancelablePromise(function (resolve, reject) {
            if (_this._promise) {
                var reject_1 = function (r) {
                    if (onrejected) {
                        handleCallback(resolve, reject, onrejected, r);
                    }
                    else {
                        reject(r);
                    }
                };
                _this._promise.then(function (r) {
                    if (_this._isCanceled) {
                        reject_1(r);
                    }
                    else {
                        if (onfulfilled) {
                            handleCallback(resolve, reject, onfulfilled, r);
                        }
                        else {
                            resolve(r);
                        }
                    }
                }, reject_1);
            }
        });
        p._parentPromise = this;
        this._children.push(p);
        return p;
    };
    CancelablePromise.prototype.catch = function (onrejected) {
        if (this._isCanceled && onrejected) {
            onrejected(new CancelError());
        }
        return this.then(undefined, onrejected);
    };
    CancelablePromise.prototype.finally = function (onfinally) {
        if (this._promise) {
            return this._promise.finally(onfinally);
        }
        if (this._isCanceled) {
            return Promise.reject(new CancelError());
        }
        return Promise.reject(onfinally);
    };
    CancelablePromise.prototype.cancel = function () {
        if (this._isCanceled) {
            return this;
        }
        this._isCanceled = true;
        var parent = this._getTopParent();
        if (parent) {
            parent.cancel();
        }
        if (this._children) {
            this._children.forEach(function (x) { return x.cancel(); });
        }
        if (this._isPending) {
            if (this._cancelHandlers.length) {
                try {
                    for (var _i = 0, _a = this._cancelHandlers; _i < _a.length; _i++) {
                        var handler = _a[_i];
                        handler();
                    }
                }
                catch (error) {
                    // this._setCanceledCallback(error);
                }
            }
            if (this._setCanceledCallback) {
                this._setCanceledCallback();
            }
        }
        this._destroy();
        return this;
    };
    CancelablePromise.prototype._getTopParent = function () {
        var parent = this._parentPromise;
        var hasParent = !!parent;
        while (hasParent) {
            if (parent && parent._parentPromise) {
                parent = parent._parentPromise;
                hasParent = !!parent;
            }
            else {
                hasParent = false;
            }
        }
        return parent;
    };
    CancelablePromise.prototype._destroy = function () {
        this._setCanceledCallback = undefined;
        this._cancelPromise = undefined;
        this._promise = undefined;
    };
    CancelablePromise.CancelError = CancelError;
    return CancelablePromise;
}());
Object.setPrototypeOf(CancelablePromise.prototype, Promise.prototype);

//
var script$1 = {
  components: {
    VCard,
    VCardActions,
    VCardText,
    VDialog,
    VIcon,
    VToolbar,
    VToolbarTitle,
    VSpacer,
    VBtn,
  },
  props: {
    buttonTrueText: {
      type: String,
      default: "Yes",
    },
    buttonFalseText: {
      type: String,
      default: "No",
    },
    buttonTrueColor: {
      type: String,
      default: "primary",
    },
    buttonFalseColor: {
      type: String,
      default: "primary",
    },
    buttonFalseFlat: {
      type: Boolean,
      default: true,
    },
    buttonTrueFlat: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "warning",
    },
    icon: {
      type: String,
      default() {
        return this.$vuetify.icons.values.warning;
      },
    },
    message: {
      type: String,
      required: true,
    },
    persistent: Boolean,
    title: {
      type: String,
    },
    width: {
      type: Number,
      default: 450,
    },
  },
  data() {
    return {
      value: false,
    };
  },
  mounted() {
    document.addEventListener("keyup", this.onEnterPressed);
  },
  destroyed() {
    document.removeEventListener("keyup", this.onEnterPressed);
  },
  methods: {
    onEnterPressed(e) {
      if (e.keyCode === 13) {
        e.stopPropagation();
        this.choose(true);
      }
    },
    choose(value) {
      this.$emit("result", value);
      this.value = value;
      this.$destroy();
    },
    change(res) {
      this.$destroy();
    },
  },
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-dialog',{attrs:{"eager":"","value":"true","max-width":_vm.width,"persistent":_vm.persistent},on:{"input":_vm.change,"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"esc",27,$event.key,["Esc","Escape"])){ return null; }return _vm.choose(false)}}},[_c('v-card',{attrs:{"tile":""}},[(Boolean(_vm.title))?_c('v-toolbar',{attrs:{"color":_vm.color,"dense":"","flat":""}},[(Boolean(_vm.icon))?_c('v-icon',{attrs:{"left":""}},[_vm._v(_vm._s(_vm.icon))]):_vm._e(),_vm._v(" "),_c('v-toolbar-title',{staticClass:"white--text",domProps:{"textContent":_vm._s(_vm.title)}})],1):_vm._e(),_vm._v(" "),_c('v-card-text',{staticClass:"body-1 text-body-1 py-3",domProps:{"innerHTML":_vm._s(_vm.message)}}),_vm._v(" "),_c('v-card-actions',[_c('v-spacer'),_vm._v(" "),(Boolean(_vm.buttonFalseText))?_c('v-btn',{attrs:{"text":"","color":_vm.buttonFalseColor,"text":_vm.buttonFalseFlat},on:{"click":function($event){return _vm.choose(false)}}},[_vm._v("\n        "+_vm._s(_vm.buttonFalseText)+"\n      ")]):_vm._e(),_vm._v(" "),(Boolean(_vm.buttonTrueText))?_c('v-btn',{attrs:{"color":_vm.buttonTrueColor,"text":_vm.buttonTrueFlat},on:{"click":function($event){return _vm.choose(true)}}},[_vm._v("\n        "+_vm._s(_vm.buttonTrueText)+"\n      ")]):_vm._e()],1)],1)],1)};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script = {
  components: {
    VSnackbar,
    VIcon,
    VBtn,
  },
  props: {
    color: {
      type: String,
      default: "warning",
    },
    icon: {
      type: String,
      default() {
        return this.$vuetify.icons.values.info;
      },
    },
    closeIcon: {
      type: String,
      default() {
        return this.$vuetify.icons.values.close;
      },
    },
    message: {
      type: String,
      required: true,
    },
    timeout: {
      type: Number,
      default: 3000,
    },
    dismissible: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      value: true,
    };
  },
  mounted() {
    document.addEventListener("keyup", this.onEnterPressed);
  },
  destroyed() {
    document.removeEventListener("keyup", this.onEnterPressed);
  },
  methods: {
    onEnterPressed(e) {
      if (e.keyCode === 13) {
        e.stopPropagation();
        this.choose(true);
      }
    },
    dismiss() {
      if (this.dismissible) {
        this.value = false;
        this.$destroy();
      }
    },
    change(res) {
      this.$destroy();
    },
  },
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-snackbar',{attrs:{"timeout":_vm.timeout,"color":_vm.color},scopedSlots:_vm._u([{key:"action",fn:function(ref){
var attrs = ref.attrs;
return [(_vm.dismissible)?_c('v-btn',_vm._b({attrs:{"icon":""},on:{"click":_vm.dismiss}},'v-btn',attrs,false),[_c('v-icon',[_vm._v(_vm._s(_vm.closeIcon))])],1):_vm._e()]}}]),model:{value:(_vm.value),callback:function ($$v) {_vm.value=$$v;},expression:"value"}},[(Boolean(_vm.icon))?_c('v-icon',{attrs:{"left":""}},[_vm._v("\n    "+_vm._s(_vm.icon)+"\n  ")]):_vm._e(),_vm._v("\n  "+_vm._s(_vm.message)+"\n\n  ")],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

let createNoticeCmp;
let Confirm;
let Notice;
const confirmProperty = '$confirmDialog';
const noticeProperty = '$notice';
let noticeOptions;
function NoticeSetup(Vue, installOptions) {
    noticeOptions = { ...installOptions };
    const vuetify = noticeOptions.vuetify;
    delete noticeOptions.vuetify;
    if (!vuetify) {
        console.warn('Module vuetify-notice needs vuetify instance. Use Vue.use(NoticeSetup, { vuetify })');
    }
    Confirm = Vue.extend(Object.assign({ vuetify }, __vue_component__$1));
    Notice = Vue.extend(Object.assign({ vuetify }, __vue_component__));
    createNoticeCmp = (Cmp, opt) => {
        const container = document.querySelector('[data-app=true]') || document.body;
        return new CancelablePromise((resolve, reject, onCancel) => {
            const cmp = new Cmp({
                propsData: Object.assign({}, 
                // Vue.prototype[confirmProperty].options,
                opt),
                destroyed: () => {
                    container.removeChild(cmp.$el);
                    resolve(cmp.value);
                },
            });
            onCancel(() => {
                cmp.$destroy();
            });
            container.appendChild(cmp.$mount().$el);
        });
    };
    Vue.prototype[confirmProperty] = confirmDialog;
    Vue.prototype[noticeProperty] = notice;
    // Vue.prototype[confirmProperty].options = options || {};
}
function getOptions(name) {
    if (noticeOptions) {
        const opt = noticeOptions[name];
        if (typeof opt === 'function') {
            return opt();
        }
        else if (typeof opt === 'object') {
            return opt;
        }
    }
    return {};
}
function confirmDialog(msgOrOpt, options = {}) {
    if (typeof msgOrOpt === 'string') {
        options.message = msgOrOpt;
    }
    else if (typeof msgOrOpt === 'object') {
        options = { ...msgOrOpt, ...options };
    }
    if (createNoticeCmp) {
        return createNoticeCmp(Confirm, {
            ...getOptions('confirmDialog'),
            ...options,
        });
    }
    else {
        throw Error('CreateNotice is not installed yet');
    }
}
let noticePromise;
function notice(msgOrOpt, options = {}) {
    if (typeof msgOrOpt === 'string') {
        options.message = msgOrOpt;
    }
    else if (typeof msgOrOpt === 'object') {
        options = { ...msgOrOpt, ...options };
    }
    if (createNoticeCmp) {
        if (noticePromise) {
            noticePromise.cancel();
        }
        noticePromise = createNoticeCmp(Notice, {
            ...getOptions('notice'),
            ...options,
        });
        return noticePromise;
    }
    else {
        throw Error('CreateNotice is not installed yet');
    }
}

export { NoticeSetup, confirmDialog, notice };
