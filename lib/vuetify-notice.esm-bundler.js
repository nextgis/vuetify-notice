/** Bundle of @nextgis/vuetify-notice; version: 0.0.1; author: rendrom@gmail.com */
import CancelablePromise from '@nextgis/cancelable-promise';
import { VCard, VCardActions, VCardText, VDialog, VIcon, VToolbar, VToolbarTitle, VSpacer, VBtn, VSnackbar } from 'vuetify/lib';

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

  var ConfirmComponent = __vue_component__$1;

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

  var NoticeComponent = __vue_component__;

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
    Confirm = Vue.extend(Object.assign({ vuetify }, ConfirmComponent));
    Notice = Vue.extend(Object.assign({ vuetify }, NoticeComponent));
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
            ...options,
            ...getOptions('confirmDialog'),
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
            ...options,
            ...getOptions('notice'),
        });
        return noticePromise;
    }
    else {
        throw Error('CreateNotice is not installed yet');
    }
}

export { NoticeSetup, confirmDialog, notice };
