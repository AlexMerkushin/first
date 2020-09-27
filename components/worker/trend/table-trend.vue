<template>
<div>
  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis dignissimos officia repellendus soluta voluptas ut officiis mollitia aut ipsam dicta! Laudantium ut unde mollitia architecto cupiditate vero, necessitatibus autem molestiae.
    <v-data-table v-if="trends" :headers="header" :items="trends" :search="search">
      <template v-slot:top>
        <v-layout row wrap align-center justify-center>
          <v-flex xs2>
            <v-edit-dialog large save-text="צור מגמה" cancel-text="בטל" @save="create">
              <v-btn fab color="info">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <template v-slot:input>
               <v-text-field
                    v-model="name"
                    label="הוסף"
                    single-line
                    counter="25"
                    :rules="max25char"
                    @keydown.enter="create"
                  ></v-text-field>
              </template>
            </v-edit-dialog>
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
      <template v-slot:[`item.edit-delete`]="{item}">
        <v-row align="center" justify="start" no-gutters dense>
          <v-col cols="1">
            <v-edit-dialog
              :return-value.sync="item.name"
              large
              save-text="עדכן"
              cancel-text="בטל"
              @save="update(item)"
            >
              <v-icon>mdi-table-edit</v-icon>
              <template v-slot:input>
                <v-text-field v-model="item.name" label="עדכן" single-line counter="25" :rules="max25char"></v-text-field>
              </template>
            </v-edit-dialog>
          </v-col>
          <v-col cols="1">
            <v-btn icon @click="delete_row(item)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-data-table>
    <div v-else>
      dont have a trends
    </div>
    <v-dialog v-model="dialog" max-width="500px">
      <add-examine @add="update" @close="dialog = false" />
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    name: null,
    trends: null,
    header: [
      { text: 'מזהה', value: 'id' },
      { text: 'שם', value: 'name' },
      { text: 'ערוך/מחק', value: 'edit-delete' },
    ],
    search: null,
    max25char: [
      (v) => !!v || 'שדה חובה'
    ],
  }),
  async fetch() {
    this.trends = await this.$axios.$get('/trends')
  },
  methods: {
    async update(row) {
      await this.$axios.put('/trends/' + row.id, { name: row.name })
    },
    delete_row(row) {
      this.$swal({
        title: 'מחיקת מגמה',
        text: 'לא ניתן לבטל פעולה זו.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'מחק מגמה',
        cancelButtonText: 'בטל',
        footer:
          'שים לב! לפני מחיקת המגמה עליך לוודא שלא קיימים סטודנטים במגמה זו',
      }).then((res) => {
        if (res.value) {
          this.$axios.delete('/trends/' + row.id).then((del) => {
            if (del.status === 200) {
              const index = this.trends.indexOf(row)
              this.trends.splice(index, 1)
            }
          })
        }
      })
    },
    async create()
    {
        if (this.name && this.name.length<=25)
        {
         const create = await this.$axios.post("/trends", {name: this.name});
         if(create.status === 201)
         {           
           this.trends.push(create.data);
         }   
        }
        else 
        {
          this.$swal({
          icon: 'error',
          text: 'ערכים לא תקניים',
          confirmButtonText: 'סגור',
          footer: "מקסימום 25 תווים"
        })
        }
        
    }
  },
  created(){
    this.$fetch()
  }
}
</script>
