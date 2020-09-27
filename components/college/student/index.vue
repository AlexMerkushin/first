<template>
  <v-container grid-list-xs>
    <v-data-table :headers="head" :items="data" :search="search" v-if="data">
      <template v-slot:top>
        <v-layout row wrap align-center justify-center>
          <v-flex xs2>
            <v-btn fab color="info" @click="dynamicDialog = 'addStudents'">
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
      <template v-slot:[`item.trendName`]="{item}" v-if="trend">
        <v-edit-dialog
          save-text="עדכן"
          cancel-text="בטל"
          large
          @save="update(item.id, {trendId:item.trendId})"
        >
          {{trendById(item.trendId).name}}
          <template v-slot:input>
            <v-autocomplete
              :items="trend"
              item-text="name"
              item-value="id"
              label="מגמה"
              v-model="item.trendId"
              :rules="EmptyRules"
              clearable
              prepend-icon="mdi-format-list-bulleted-type"
            />
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:[`item.teacherId`]="{item}">
        <v-edit-dialog
          save-text="עדכן"
          cancel-text="בטל"
          large
          @save="update(item.id,{teacherId:item.teacherId})"
        >
          {{item.teacherId}}
          <template v-slot:input>
            <v-autocomplete
              :items="teachers"
              item-text="accountId"
              item-value="id"
              label="מנחה"
              v-model="item.teacherId"
              :rules="EmptyRules"
              clearable
              prepend-icon="mdi-school"
            />
          </template>
        </v-edit-dialog>
      </template>
    </v-data-table>
    <v-dialog :value="dynamicDialog != null" @click:outside="dynamicDialog = null" max-width="500">
      <v-card>
        <keep-alive>
          <component
            :is="dynamicDialog"
            :idCollege="idCollege"
            :trends="trend"
            :teachers="teachers"
            v-if="data"
            @close="dynamicDialog = null"
            @add="updateTable"
          />
        </keep-alive>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import addStudents from './addStudents.vue'
export default {
  components: {
    addStudents,
  },
  props: {
    idCollege: Number,
  },
  data: () => ({
    dynamicDialog: null,
    data: null,
    trend: null,
    head: [
      {
        text: 'מספר ייחודי',
        value: 'id',
      },
      {
        text: 'מספר זהות',
        value: 'accountId',
      },
      {
        text: 'מספר מורה',
        value: 'teacherId',
      },

      {
        text: 'שם מגמה',
        value: 'trendName',
      },
    ],
    search: null,
    EmptyRules: [(v) => !!v || 'שדה חובה'],
    teachers: null,
  }),
  async mounted() {
    //get list trend
    let a = await this.$axios.$get('/trends')
    this.trend = a

    a = await this.$axios.$get('/teachers/college/' + this.idCollege)
    this.teachers = a

    //get list students
    a = await this.$axios.$get('/students/' + this.idCollege)
    this.data = a
  },
  methods: {
    trendById(id) {
      const val = this.trend.find((d) => d.id == id)
      return val
    },
    async update(id, json) {
      alert(id)
      await this.$axios.put('/students/' + id, json)
    },
    updateTable(row) {
      this.data.push(row)
    },
  },
}
</script>