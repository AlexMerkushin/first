<template>
  <div>
    <v-list class="align-center text-center">
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
    </v-list>
  </div>
</template>

<script>
export default {
  props: {
    projectId: Number,
  },
  data: () => ({
    data: null,
  }),
  async fetch() {
    this.data = await this.$axios.$get('/test/project/' + this.projectId)
  },
  created(){
    this.$fetch()
  }
}
</script>
