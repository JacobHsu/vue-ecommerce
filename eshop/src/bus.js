import Vue from 'vue';
//掛載在Vue原型下
Vue.prototype.$bus = new Vue();

// 跨元件通訊 Message
// vm.$bus.$emit('messsage:push', message, status);
// message(String): 訊息內容
// status(String): Alert 的樣式