<template>
  <v-container grid-list-xs fluid>
    <v-card-text v-if="$fetchState.pending">load</v-card-text>
    <v-card-text v-else-if="$fetchState.error">error, {{$fetchState.error}}</v-card-text>
    <v-list v-else class="align-center text-center">
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-key</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{data.id}}</v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-calendar-clock</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{data.time}}</v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-calendar-plus</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{data.date}}</v-list-item-title>
      </v-list-item>

      <v-list-item v-if="data.grade">
        <v-list-item-icon>
          <v-icon>mdi-waves</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{data.grade}}</v-list-item-title>
      </v-list-item>

      <template v-else>
        <v-list-item @click="dialog = 'create'">
          <v-list-item-icon>
            <v-icon>mdi-pen</v-icon>
          </v-list-item-icon>
          <v-list-item-title>שנה מועד בחינה</v-list-item-title>
        </v-list-item>

        <v-list-item @click="dialog = 'setGrade'">
          <v-list-item-icon>
            <v-icon>mdi-pen</v-icon>
          </v-list-item-icon>
          <v-list-item-title>ציון בחינה</v-list-item-title>
        </v-list-item>


      </template>
    </v-list>
    <v-dialog :value="dialog != null" @click:outside="dialog = null" :max-width="dialog === 'setGrade'? 200: fullscreen">
      <v-card>
        <component :is="dialog" :projectId="projectId" @next="update" @finish="setGrade"/>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  components:{
    create:()=>import("./create-test.vue"),
    setGrade:()=>import("./set-grade.vue")
  },
  props: {
    projectId: Number,
  },
  data: () => ({
    data: null,
    dialog: null,
  }),
  async fetch() {
    this.data = await this.$axios.$get('/test/project/' + this.projectId)
  },
  methods: {
    update(test) {
      this.data = test
      this.dialog = null
    },
    setGrade(grade)
    {
      this.data.grade = grade
      this.dialog = null
    }
  },
}
</script>
