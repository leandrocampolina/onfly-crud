<template>
  <div class="loading" v-if="loading">
    <q-spinner-tail color="primary" size="100px" class="spinner-overlay"/>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'LoadingApp',
  setup() {
    const store = useStore();

    const loading = computed(() => store.state.loading);

    return {
      loading,
    };
  },
};
</script>
<style scoped>
.spinner-overlay {
  position: absolute;
  z-index: 99999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
