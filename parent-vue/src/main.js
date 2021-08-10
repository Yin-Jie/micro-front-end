import Vue from 'vue';
import { registerApplication, start } from 'single-spa';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

async function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// singleSpa缺陷：不够灵活，不能够动态加载js文件
// 样式不隔离，没有js沙箱机制
registerApplication('myApp',
  async () => {
    console.log('模块加载');
    await loadScript('http://localhost:10000/js/chunk-vendors.js');
    await loadScript('http://localhost:10000/js/app.js');
    return window.singleVue; // bootstrap mount unmount
  },
  (location) => location.pathname.startsWith('/vue'), // 用户切换到/vue的路径下，我需要加载刚才定义的子应用\
// eslint-disable-next-line function-paren-newline
);
start();

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
