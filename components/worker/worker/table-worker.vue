<template>
  <div>   <v-data-table v-if="worker" :headers="header" :items="worker" :search="search">
      <template v-slot:top>
        <v-layout row wrap align-center justify-center>
          <v-flex xs2>
            <v-btn fab color="info" @click="dialog = true">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              label="חיפוש חופשי"
              v-model="search"
              prepend-inner-icon="mdi-account-search"
              clearable
            ></v-text-field>
          </v-flex>
        </v-layout>
      </template>
      <template v-slot:[`item.phone`]="{item}">
        <v-btn text :href="'tel:'+item.phone">{{item.phone}}</v-btn>
      </template>
      <template v-slot:[`item.email`]="{item}">
        <v-btn text :href="'mailto:'+item.email">{{item.email}}</v-btn>
      </template>
      <template v-slot:[`item.delete`] = "{item}">
        <v-btn icon @click="deleteWorker(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="500px">
      <add-worker @add="update" @close="dialog = false" />
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    worker: null,
    header: [
      { text: 'תעודת זהות', value: 'id' },
      { text: 'שם פרטי', value: 'firstName' },
      { text: 'שם משפחה', value: 'lastName' },
      { text: 'מייל', value: 'email' },
      { text: 'מין', value: 'sex' },
      { text: 'טלפון', value: 'phone' },
      { text: 'כתובת', value: 'addres' },
      { text: 'מחק', value: 'delete', sortable: false, filterable: false},
    ],
    search: null,
  }),
  async fetch() {
    this.worker = await this.$axios.$get('/accounts/worker')
    console.log("fetch")
  },
  methods: {
    update(row) {
      this.worker.push(row)
    },
    deleteWorker(worker) {
      this.$swal({
        title: 'מחיקת עובד',
        text: 'לא ניתן לבטל פעולה זו',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'מחק עובד',
        cancelButtonText: 'בטל',
        rtl: true,
      }).then((result) => {
        if (result.value) {
          this.$axios.delete('/accounts/'+worker.id).then((data) => {
            if (data.status === 200) {
              const index = this.worker.indexOf(worker)
              if (index > -1) this.worker.splice(index, 1)
            }
          })
        }
      })
    },
  },
  created(){
    this.$fetch()
  }
}
</script>
