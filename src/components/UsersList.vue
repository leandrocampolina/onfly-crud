<template>
  <q-spinner-tail v-if="loading" color="primary" size="100px" class="spinner-overlay" />
  <q-table
    :rows="tableData"
    :columns="tableColumns"
    :filter="filter"
    :sorting="sorting"
    v-model:pagination="pagination"
    body-style="font-size: 14px;"
  >
    <!-- <template v-slot:top>
      <q-input v-model="filter" label="Pesquisar" />
    </template> -->
    <template v-slot:top-left>
      <q-input v-model="search" label="Search" />
    </template>
    <template v-slot:top-right>
      <q-btn class="new-user" @click="createNewUser">New User</q-btn>
    </template>
    <template v-slot:body-cell-details="props">
      <q-td style="width: 10px" :props="props">
        <q-icon
          name="fas fa-info"
          style="color: #000000; cursor: pointer;"
          @click="detailsRow(props.row)"></q-icon>
      </q-td>
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td class="table-icons" :props="props">
        <q-icon
          name="fas fa-pen"
          style="color: #33ce09; cursor: pointer;"
          @click="editRow(props.row)"></q-icon>
        <q-icon
          name="fas fa-trash"
          style="color: #ff0000; cursor: pointer;"
          @click="deleteRow(props.row)"></q-icon>
      </q-td>
    </template>
    <template v-slot:bottom>
      <q-pagination
        v-model="pagination.page"
        :min="1"
        :max="pagination.rowsNumber"
        :input="true"
        @update:model-value="updatePagination"
      />
    </template>
  </q-table>
</template>

<script>
/* eslint-disable */
import axios from 'axios';

export default {
  data() {
    return {
      tableData: [],
      tableColumns: [
        {
          name: 'details',
          label: 'Details',
          align: 'center',
        },
        {
          name: 'id',
          label: 'ID',
          align: 'center',
          field: 'id',
          sortable: true,
        },
        {
          name: 'name',
          label: 'Name',
          align: 'left',
          field: 'name',
          sortable: true,
        },
        {
          name: 'email',
          label: 'E-mail',
          align: 'left',
          field: 'email',
          sortable: true,
        },
        {
          name: 'gender',
          label: 'Gender',
          align: 'left',
          field: 'gender',
          sortable: true,
        },
        {
          name: 'status',
          label: 'Status',
          align: 'left',
          field: 'status',
          sortable: true,
        },
        {
          name: 'actions',
          label: 'Actions ',
          align: 'center',
        },
      ],
      filter: '',
      sorting: {
        sortBy: 'id',
        descending: false,
      },
      pagination: {
        rowsPerPage: 10,
        page: 1,
        rowsNumber: 0,
      },
      previousPage: '',
      CurrentPage: '',
      nextPage: '',
      loading: false,
      search: '',
    };
  },

  async created() {
    await this.fetchData();
  },

  watch: {
    search() {
      this.getUsers();
    },
  },
  computed: {
    GETTERS() {
      return this.$store.getters;
    },
    ACTIONS() {
      return this.$store.dispatch;
    },
  },

  methods: {
    async getUsers() {
      try {
        const response = await axios.get(`https://gorest.co.in/public/v1/users?name=${this.search}`);
        setTimeout(() => {
          this.tableData = response.data.data;
        }, 1500);
        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    },
    fetchData() {
      this.ACTIONS('FETCH_ALL_USERS');
      setTimeout(() => {
        this.pagination.rowsPerPage = this.GETTERS.GET_PAGINATION.limit;
        this.pagination.page = this.GETTERS.GET_PAGINATION.page;
        this.pagination.rowsNumber = this.GETTERS.GET_PAGINATION.pages;
        this.previousPage = this.GETTERS.GET_PAGINATION.links.previous;
        this.currentPage = this.GETTERS.GET_PAGINATION.links.current;
        this.nextPage = this.GETTERS.GET_PAGINATION.links.next;
        this.loadData();
      }, 1700);
    },

    loadData() {
      if (this.pagination.rowsNumber > 0) {
        this.tableData = this.GETTERS.GET_ALL_USERS.data;
      }
    },

    updatePagination(page) {
      this.loading = true;
      this.$store.dispatch('PAGINATION_USERS', page);
      setTimeout(() => {
        this.tableData = this.GETTERS.GET_ALL_USERS.data;
        this.loading = false;
      }, 1000);
    },

    createNewUser() {
      this.$emit('new-user', true);
    },

    editRow(row) {
      this.$emit('edit-user', row);
    },

    deleteRow(row) {
      this.$emit('delete-user', row.id);
    },

    detailsRow(row) {
      this.$emit('info-user', row);
    },
  },
};
</script>
<style scoped>
.new-user {
  display: flex;
  background-color: #267FFA;
  color: #ffffff;
  margin-bottom: 10px;
}

.table-icons {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.spinner-overlay {
  position: absolute;
  z-index: 99999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
