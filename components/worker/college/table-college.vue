<template>
  <div>
    <v-data-table v-if="colleges" :headers="header" :items="colleges" :search="search">
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
        <v-btn icon @click="deleteCollege(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="500px">
      <add-college @add="update" @close="dialog = false" />
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    colleges: null,
    header: [
      { text: 'מזהה', value: 'id' },
      { text: 'שם', value: 'name' },
      { text: 'כתובת', value: 'addres' },
      { text: 'טלפון', value: 'phone' },
      { text: 'מייל', value: 'email' },
      {text: "מחק", value: "delete", sortable: false, filterable: false}
    ],
    search: null,
  }),
  async fetch() {
    this.colleges = await this.$axios.$get('/colleges')
  },
  methods: {
    update(row) {
      this.colleges.push(row)
    },
    deleteCollege(college)
  {
    this.$swal({
        title: 'מחיקת מכללה',
        text: 'כלל המרצים, סטודנטים, פרויקטים וקבצי פרויקטים הקשורים למכללה ימחקו.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'מחק מכללה',
        cancelButtonText: 'בטל',
        footer: "לא ניתן לבטל פעולה זו",
        rtl: true,
      }).then((result) => {
        if (result.value) {
          this.$axios.delete('/accounts/'+college.accountId).then((data) => {
            if (data.status === 200) {
              const index = this.colleges.indexOf(college)
              if (index > -1) this.colleges.splice(index, 1)
            }
          })
        }
      })
  }
  },  
  created(){
    this.$fetch()
  }
}
</script>
