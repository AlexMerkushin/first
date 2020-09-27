<template>
  <v-card>
    <add-account type="worker" @next="register" @close="$emit('close')" />
  </v-card>
</template>

<script>
export default {
  methods: {
    async register(account) {
      const a = await this.$axios.post('/accounts', account) //requiset to server
      if (a.status === 201) {// 201 is created
        this.$emit('add', a.data)
      }
      this.$emit('close')
    },
  },
}
</script>
