<template>
  <v-layout row wrap align-center justify-center>
    <v-flex xs12 sm6 class="mt-5">
      <v-form ref="form" validate-on-blur @submit="sentFrm" onsubmit="return false;">
        <v-text-field
          label="הכנס כאן את שם הפרויקט שלך :) "
          :rules="emptylRules"
          prepend-inner-icon="mdi-comment-text-outline"
          append-icon="mdi-arrow-left"
          outlined
          hint="שים לב: לא ניתן להחליף את השם לאחר ההגדרה שלו"
          counter="20"
          v-model="name"
          @click:append="sentFrm"
          clearable
        ></v-text-field>
      </v-form>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  props: {
    studentId: Number,
  },
  data: () => ({
    emptylRules: [(v) => !!v || 'שדה זה הינו חובה'],
    name: null,
  }),
  methods: {
    async sentFrm() {
      if (this.$refs.form.validate()) {
        const project = {
          name: this.name,
          studentId: this.studentId,
        }
        const tmp = await this.$axios.post('/projects', project)
        if (tmp.status == 201) {
          tmp.data.dataUpdate = new Date().toLocaleString();

          this.$emit('next', tmp.data)
        }
      }
    },
  },
}
</script>
