import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

const appOptions = {
  el: '#vue', // 挂载到父应用中id为vue的标签中
  router,
  render: (h) => h(App),
};

const vueLifeCycle = singleSpaVue({
  Vue,
  appOptions,
});
// 如果是父应用引用我，动态设置
if (window.singleSpaNavigate) {
  /* eslint-disable */
  __webpack_public_path__ = 'http://localhost:10000/';
} else {
  delete appOptions.el;
  new Vue(appOptions).$mount('#app');
}

// 协议接入，定好了协议，父应用会调用这些方法；
export const { bootstrap } = vueLifeCycle;
export const { mount } = vueLifeCycle;
export const { unmount } = vueLifeCycle;

// 我们需要父应用加载子应用，将子应用打包成一个个lib给父应用去使用
