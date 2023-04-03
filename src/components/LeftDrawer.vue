<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="background-color: #267FFA">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />
        <q-toolbar-title style="height= 100px;">
          <img width="156" height="48" src="https://www.onfly.com.br/wp-content/uploads/2021/10/onfly-header.svg" class="default-logo" alt="Onfly">
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      style="
        background-color: #267FFA;
        background-image: url(https://www.onfly.com.br/wp-content/uploads/2021/10/bkg-header-main.png);"
    >
      <q-list>
        <q-item-label
          class="user-header"
          style="color: #ffffff"
          header>Users</q-item-label>
        <q-item
          clickable
          @click="sendCreateValue">
          <q-item-section avatar>
            <q-icon
              style="margin-left: 3px; color: #ffffff"
              name="fas fa-user-plus" />
          </q-item-section>
          <q-item-section>
            <q-item-label
              style="color: #ffffff">New User</q-item-label>
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
        <loading-app />
      </q-page>
    </q-page-container>
    <q-page-container>
      <q-dialog
        v-model="showModal"
        >
        <q-card class="floating-modal">
          <q-card-section>
            <h5 class="modal-title">New User</h5>
            <q-form @submit.prevent="submitForm">
              <q-input
                v-model="name"
                label="Name"
                :rules="[required, maxLength]"
                lazy-rules/>
              <q-input
                v-model="email"
                label="Email"
                type="email"
                :rules="[required, maxLength, validEmail]"
                lazy-rules/>
              <q-select
                v-model="gender"
                label="Gender"
                :options="genderOptions"
                :rules="[required]"
                lazy-rules/>
              <q-select
                v-model="status"
                label="Active"
                :options="statusOptions"
                :rules="[required]"
                lazy-rules/>
              <q-card-actions align="right">
                <q-btn
                  label="Cancel"
                  color="negative"
                  @click="showModal = false" />
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
            <h5 class="modal-title">Edit User</h5>
            <q-form @submit.prevent="editUser">
              <q-input
                v-model="this.rowEditDetails.name"
                label="Name"
                :rules="[required, maxLength]"
                lazy-rules />
              <q-input
                v-model="this.rowEditDetails.email"
                label="Email"
                type="email"
                :rules="[required, maxLength, validEmail]"
                lazy-rules />
              <q-select
                v-model="this.rowEditDetails.gender"
                label="Gender"
                :options="genderOptions"
                :rules="[required]"
                lazy-rules />
              <q-select
                v-model="this.rowEditDetails.status"
                label="Active"
                :options="statusOptions"
                :rules="[required]"
                lazy-rules/>
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
            <h5 class="modal-title">User Datails</h5>
            <q-form @submit.prevent="editUser">
              <q-input
                readonly
                v-model="this.rowDetails.name"
                label="Name" />
              <q-input
                readonly
                v-model="this.rowDetails.email"
                label="Email"
                type="email" />
              <q-select
                readonly
                v-model="this.rowDetails.gender"
                label="Gender"
                :options="genderOptions" />
              <q-select
                readonly
                v-model="this.rowDetails.status"
                label="Active"
                :options="statusOptions"/>
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

  computed: {
    MUTATION() {
      return this.$store.commit;
    },
  },

  methods: {
    required(value) {
      return !!value || 'Name is required';
    },
    maxLength(value) {
      return (value && value.length <= 191) || 'Name must be less than or equal to 191 characters';
    },
    validEmail(value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) || 'Please enter a valid email address';
    },
    sendCreateValue() {
      this.showModal = true;
    },
    deleteUser(id) {
      this.$store.dispatch('DELETE_USER_BY_ID', id);
      this.MUTATION('SET_LOADING', true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    async infoUserModal(row) {
      await this.$store.dispatch('DETAIL_USER_BY_ID', row.id);
      this.rowDetails = this.$store.state.user;
      this.showInfoModal = true;
    },
    editUserModal(row) {
      this.rowEditDetails = row;
      this.showEditModal = true;
      return this.rowEditDetails;
    },
    editUser() {
      const userInfo = this.rowEditDetails;
      this.$store.dispatch('UPDATE_USER_BY_ID', {
        id: userInfo.id,
        updates: {
          email: this.rowEditDetails.email,
          name: this.rowEditDetails.name,
          gender: this.rowEditDetails.gender,
          status: this.rowEditDetails.status,
        },
      });
      this.showEditModal = false;
      this.MUTATION('SET_LOADING', true);
      setTimeout(() => {
        this.MUTATION('SET_LOADING', false);
      }, 1500);
    },
    submitForm() {
      this.$store.dispatch('CREATE_USER', {
        email: this.email,
        name: this.name,
        gender: this.gender,
        status: this.status,
      });
      this.showModal = false;
      this.MUTATION('SET_LOADING', true);
      setTimeout(() => {
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
  transform: translate(-50%, -50%);
}

.spinner-overlay {
  position: fixed;
  z-index: 99999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.modal-title {
  margin: 0px;
  display: flex;
  justify-content: center;
}
</style>
