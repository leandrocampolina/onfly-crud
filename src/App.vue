<template>
  <div>
    <left-drawer/>
  </div>
</template>

<script>
import LeftDrawer from '@/components/LeftDrawer.vue';
import { mapState } from 'vuex';

export default {
  name: 'App',

  components: {
    LeftDrawer,
  },

  computed: {
    ...mapState(['loading']),
  },

  watch: {
    loading(value) {
      if (value) {
        document.body.classList.add('loading');
      } else {
        document.body.classList.remove('loading');
      }
    },
  },
};
</script>
<style>
  body {
    opacity: 1;
  }

  body.loading {
    opacity: 0.4;
  }
</style>
