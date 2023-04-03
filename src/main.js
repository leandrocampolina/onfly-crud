import { createApp } from 'vue';
import { Quasar } from 'quasar';
import App from './App.vue';
import router from './router';
import store from './store/application';
import quasarUserOptions from './quasar-user-options';

createApp(App).use(Quasar, quasarUserOptions).use(store).use(router)
  .mount('#app');
