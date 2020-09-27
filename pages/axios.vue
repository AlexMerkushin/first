<template>
  <v-subheader>this{{data}}</v-subheader>
</template>

<script>
export default {
    data:()=>({
        data: null
    }),
    async mounted()
    {
        this.data = await this.$axios.$get("/trends")
    }
}
</script>

<style>

</style>