<template>
<v-container grid-list-xs>
    <v-data-table :headers="headers" :items="teachers" :search="search" v-if="teachers">
      <template v-slot:top>
        <v-layout row wrap align-center justify-center>
          <v-flex xs2>
            <v-btn fab color="info" @click="dynamicDialog = 'add'">
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
      <template v-slot:[`item.out`]="{item}" >
        <v-switch v-model="item.out" label="מרצה חוץ" messages="יש לסמן במידה והמרצה איננו עובד במכללה" @change="update(item)"></v-switch>
      </template>
          
    </v-data-table>
    <v-dialog :value="dynamicDialog != null" @click:outside="dynamicDialog = null" max-width="500">
      <v-card>
        <component :is="dynamicDialog" :IdCollege="idCollege" @close="dynamicDialog = null" @add="updateTable"/>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
    components:{
        add:()=>import("./addTeacher")
    },
    props:{
        idCollege: Number
    },
data:()=>({
    dynamicDialog: null,
    teachers: null,
    headers:[
        {
            text: "מזהה", value: "id"
        },
        {
            text: "מספר זהות", value: "accountId"
        },
        {
            text: "השכלה", value: "adocation"
        },
        {
            text: "מרצה חוץ", value: "out"
        }
    ]
}),
async mounted()
{
    const a = await this.$axios.$get("/teachers/college/" + this.idCollege)
    this.teachers = a
},
methods:{
  async update(item)
  {
    await this.$axios.put("/teachers/"+item.id, {out: item.out})
  },
  updateTable(row) {
      this.teachers.push(row)
    }
}
}
</script>
