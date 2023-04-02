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
        <q-item clickable @click="sendCreateValue">
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
        <users-list
        @new-user="sendCreateValue"
        @delete-user="deleteUser"
        @edit-user="editUserModal"
        @info-user="infoUserModal"/>
        <q-spinner-tail v-if="loading" color="primary" size="100px" class="spinner-overlay" />
      </q-page>
    </q-page-container>
    <q-page-container>
      <q-dialog
        v-model="showModal"
        >
        <q-card class="floating-modal">
          <q-card-section>
            <q-form @submit.prevent="submitForm">
              <q-input v-model="name" label="Name" />
              <q-input v-model="email" label="Email" type="email" />
              <q-select v-model="gender" label="Gender" :options="genderOptions" />
              <q-select v-model="status" label="Active" :options="statusOptions"/>
              <q-card-actions align="right">
                <q-btn label="Cancel" color="negative" @click="showEditModal = false" />
                <q-btn @submit.prevent="submitForm" label="Save" type="submit" color="positive" />
              </q-card-actions>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-page-container>
    <q-page-container>
      <q-dialog
        v-model="showEditModal"
        >
        <q-card class="floating-modal">
          <q-card-section>
            <h5>Edição de Usuário</h5>
            <q-form @submit.prevent="editUser">
              <q-input v-model="name" label="Name" />
              <q-input v-model="email" label="Email" type="email" />
              <q-select v-model="gender" label="Gender" :options="genderOptions" />
              <q-select v-model="status" label="Active" :options="statusOptions"/>
              <q-card-actions align="right">
                <q-btn label="Cancel" color="negative" @click="showEditModal = false" />
                <q-btn @submit.prevent="editUser" label="Save" type="submit" color="positive" />
              </q-card-actions>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-page-container>
    <q-page-container>
      <q-dialog
        v-model="showInfoModal"
        >
        <q-card class="floating-modal">
          <q-card-section>
            <h5>Detalhes do Usuário</h5>
            <q-form @submit.prevent="editUser">
              <q-input readonly v-model="this.rowDetails.name" label="Name" />
              <q-input readonly v-model="this.rowDetails.email" label="Email" type="email" />
              <q-select readonly
              v-model="this.rowDetails.gender" label="Gender" :options="genderOptions" />
              <q-select readonly
              v-model="this.rowDetails.status" label="Active" :options="statusOptions"/>
              <q-card-actions align="right">
                <q-btn label="Cancel" color="negative" @click="showInfoModal = false" />
              </q-card-actions>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
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

  data() {
    return {
      rowDetails: {},
      rowEditDetails: {},
      showModal: false,
      showEditModal: false,
      showInfoModal: false,
      name: '',
      email: '',
      gender: '',
      genderOptions: ['Male', 'Female', 'Other'],
      statusOptions: ['Active', 'Inactive'],
      status: 'Inactive',
      loading: false,
    };
  },

  setup() {
    return {
      leftDrawerOpen: ref(false),
    };
  },

  methods: {
    sendCreateValue() {
      console.log('entrou aqui tbm');
      this.showModal = true;
    },
    deleteUser(id) {
      console.log('id', id);
      this.$store.dispatch('DELETE_USER_BY_ID', id);
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        window.location.reload();
      }, 1000);
    },
    async infoUserModal(row) {
      await this.$store.dispatch('DETAIL_USER_BY_ID', row.id);
      this.rowDetails = this.$store.state.user;
      this.showInfoModal = true;
      // this.rowDetails
    },
    editUserModal(row) {
      this.rowEditDetails = row;
      this.showEditModal = true;
      return this.rowEditDetails;
    },
    editUser() {
      const userInfo = this.rowEditDetails;
      console.log('userInfo', userInfo);
      this.$store.dispatch('UPDATE_USER_BY_ID', {
        id: userInfo.id,
        updates: {
          email: this.email,
          name: this.name,
          gender: this.gender,
          status: this.status,
        },
      });
      this.showEditModal = false;
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        window.location.reload();
      }, 1500);
      console.log('entrou aqui tbm', userInfo);
    },
    submitForm() {
      this.$store.dispatch('CREATE_USER', {
        email: this.email,
        name: this.name,
        gender: this.gender,
        status: this.status,
      });
      console.log('entrou aqui');
      this.showModal = false;
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        window.location.reload();
      }, 1500);
    },
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

.floating-modal{
  border: 2px solid #267FFA;
  width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);}

.spinner-overlay {
  position: fixed;
  z-index: 99999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
