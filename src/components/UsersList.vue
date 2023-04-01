<template>
  <q-table
    :rows="tableData"
    :columns="tableColumns"
    :filter="filter"
    :sorting="sorting"
    :class="['user-layout', side]"
  >
    <!-- <template v-slot:top>
      <q-input v-model="filter" label="Pesquisar" />
    </template> -->
    <!-- <template v-slot:top>
      <q-btn @click="fetchEvent">clique aqui</q-btn>
    </template> -->
  </q-table>
</template>

<script>

export default {
  data() {
    return {
      tableData: [],
      tableColumns: [
        {
          name: 'id',
          label: 'ID',
          align: 'center',
          field: 'id',
          sortable: true,
        },
        {
          name: 'name',
          label: 'Nome',
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
          label: 'Gênero',
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
      ],
      filter: '',
      sorting: {
        sortBy: 'id',
        descending: false,
      },
    };
  },

  mounted() {
    this.ACTIONS('FETCH_ALL_USERS');
    this.fetchData();
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
    fetchData() {
      const users = this.GETTERS.GET_ALL_USERS;
      this.tableData = users.data;
    },
  },
  // methods: {
  //   fetchEvent() {
  //     this.ACTIONS('FETCH_ALL_USERS');
  //     const users = this.GETTERS.GET_ALL_USERS;
  //     this.tableData = users.data;
  //   },
  // },
};
</script>
