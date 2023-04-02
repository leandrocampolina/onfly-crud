<template>
  <q-table
    :rows="tableData"
    :columns="tableColumns"
    :filter="filter"
    :sorting="sorting"
    :pagination="pagination"
    body-style="font-size: 14px;"
  >
    <!-- <template v-slot:top>
      <q-input v-model="filter" label="Pesquisar" />
    </template> -->
    <template v-slot:top-right>
      <q-btn class="new-user" @click="createNewUser">Novo Usuário</q-btn>
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
    <!-- <template #body-cell-edit="{ value: id }">
      <q-icon name="fas fa-pen" class="cursor-pointer" @click="editRow(id)" />
    </template>

    <template #body-cell-delete="{ value: id }">
      <q-icon name="fas fa-trash" style="color: #fd0808" @click="deleteRow(id)" />
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
        {
          name: 'actions',
          label: 'Action',
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
      },
    };
  },

  async created() {
    await this.fetchData();
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
      this.ACTIONS('FETCH_ALL_USERS');
      setTimeout(() => {
        this.tableData = this.GETTERS.GET_ALL_USERS.data;
        console.log('tabledata', this.tableData);
      }, 2000);
    },

    createNewUser() {
      console.log('entrouiii');
      this.$emit('new-user', true);
    },

    editRow(row) {
      this.$emit('edit-user', row);
      console.log('Editar linha com ID:', row);
    },

    deleteRow(row) {
      this.$emit('delete-user', row.id);
      console.log('Excluir linha com ID:', row.id);
    },

    detailsRow(row) {
      this.$emit('info-user', row);
      console.log('Detalhes da linha', row);
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
</style>
