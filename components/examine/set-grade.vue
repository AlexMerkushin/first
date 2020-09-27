<template>
  <v-text-field
    label="ציון"
    type="number"
    min="0"
    max="100"
    :rules="[gradeRules]"
    append-icon="mdi-arrow-left"
    @keypress.enter="set"
    @click:append="set"
    v-model="grade"
    :disabled="lockFile"
  ></v-text-field>
</template>

<script>
export default {
  props: {
    projectId: Number,
    
  },
  data: () => ({
    gradeRules: (v) => (v >= 0 && v <= 100) || 'ציון לא תקין',
    grade: 0,
    lockFile: false
  }),
  methods: {
    async set() {
      const res = await this.$axios.post('/test', {
        projectId: this.projectId,
        grade: this.grade,
      })
      if (res.status === 200) {
        this.lockFile = true
        this.$emit("finish", this.grade)
      }
    },
  },
}
</script>
