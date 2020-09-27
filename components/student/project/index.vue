<template>
  <v-container fluid grid-list-xs>
    <v-stepper v-model="steper" v-if="status">
      <v-stepper-header>
        <v-stepper-step
          v-for="k in status"
          :key="k.id"
          :step="k.id"
          :complete="k.id<steper"
        >{{k.direction}}</v-stepper-step>
      </v-stepper-header>

      <v-stepper-content :step="1">
        <createProject :studentId="id" @next="next" />
      </v-stepper-content>

      <v-stepper-content :step="2">
        <uploadFile v-if="project" :main="false" :projectId.sync="project.id" @next="next" />
      </v-stepper-content>
      <v-stepper-content :step="3">
        <v-alert type="info" :value="true">יש להמתין לאישור המנחה שלך</v-alert>
      </v-stepper-content>
      <v-stepper-content :step="4">
        <v-alert type="info" :value="true">יש להמתין לאישור מהט</v-alert>
      </v-stepper-content>
      <v-stepper-content :step="5">
        <uploadFile v-if="project" :main="true" :projectId="project.id" @next="next" />
      </v-stepper-content>
      <v-stepper-content :step="6">
        <v-alert type="info" :value="true">יש להמתין לאישור מהט</v-alert>
      </v-stepper-content>

      <v-stepper-content :step="7">
        <v-alert type="info" :value="true">יש להמתין למועד הבחינה של מה"ט</v-alert>
      </v-stepper-content>

      <v-stepper-content :step="8">
        <get-test-by-project v-if="project && project.statusId===8" :projectId.sync="project.id" />
      </v-stepper-content>
    </v-stepper>
    <table-project :project.sync="project" v-if="steper > 1" @back="back" />
    <table-file
      v-if="project && steper > 2"
      :projectId.sync="project.id"
      :statusId.sync="steper"
      @back="back"
    />
  </v-container>
</template>

<script>
export default {
  props: {
    id: Number,
  },
  methods: {
    next(data) {
      if (this.steper === 1) this.project = data
      this.steper++
      const step = this.steper
    },
    back(statusId) {
      this.steper = statusId
      if (statusId === 1) this.project = null
    },
  },
  data: () => ({
    status: null,
    project: null,
    steper: 1,
  }),
  components: {
    createProject: () => import('./createProject'),
    uploadFile: () => import('./uploadFile'),
  },
  async fetch() {
    this.status = await this.$axios.$get('/projects/status')
    this.project = await this.$axios.$get('/projects/student/' + this.id)

    this.steper = this.project ? this.project.statusId : 1
  },
  created(){
    this.$fetch()
  }
}
</script>
