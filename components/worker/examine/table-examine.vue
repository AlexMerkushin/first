<template>
  <div>
    <v-data-table v-if="accounts" :headers="header" :items="accounts" :search="search">
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
        <v-btn icon @click="deleteExamine(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="500px">
      <add-examine @add="update" @close="dialog = false" />
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    accounts: null,
    header: [
      { text: 'תעודת זהות', value: 'id' },
      { text: 'שם פרטי', value: 'firstName' },
      { text: 'שם משפחה', value: 'lastName' },
      { text: 'מייל', value: 'email' },
      { text: 'מין', value: 'sex' },
      { text: 'טלפון', value: 'phone' },
      { text: 'כתובת', value: 'addres' },
      {text: "מחק", value: "delete", sortable: false, filterable: false}
    ],
    search: null,
  }),
  async fetch() {
    this.accounts = await this.$axios.$get('/accounts/examine')
  },
  methods: {
    update(row) {
      this.accounts.push(row)
    },
    deleteExamine(examine) {
      this.$swal({
        title: 'מחיקת בוחן',
        text: 'לא ניתן לבטל פעולה זו',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'מחק בוחן',
        cancelButtonText: 'בטל',
        rtl: true,
      }).then((result) => {
        if (result.value) {
          this.$axios.delete('/accounts/'+examine.id).then((data) => {
            if (data.status === 200) {
              const index = this.accounts.indexOf(examine)
              if (index > -1) this.accounts.splice(index, 1)
            }
          })
        }
      })
    }
  },created(){
    this.$fetch()
  }

}
</script>
