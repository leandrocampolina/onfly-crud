<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          Onfly Crud
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      style="background-color: #267FFA;"
    >
      <q-list>
        <q-item-label class="user-header" style="color: #ffffff" header>Usuários</q-item-label>
        <q-item @click="createNewUser">
          <q-item-section avatar>
            <q-icon style="margin-left: 3px; color: #ffffff" name="fas fa-user-plus" />
          </q-item-section>
          <q-item-section>
            <q-item-label style="color: #ffffff">Novo Usuário</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://github.com/quasarframework/">
          <q-item-section avatar>
            <q-icon style="color: #ffffff" name="fas fa-list" />
          </q-item-section>
          <q-item-section>
            <q-item-label style="color: #ffffff">Lista de Usuários</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
        <q-page padding>
          <users-list/>
        </q-page>
      </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import UsersList from '@/components/UsersList.vue';

export default {
  name: 'LayoutDefault',

  components: {
    UsersList,
  },

  setup() {
    return {
      leftDrawerOpen: ref(false),
    };
  },
};
</script>

<style scoped>
.user-header {
  padding-left: 30px;
  font-size: 20px;
  font-weight: 500;
  color: #ffffff;
}
</style>
