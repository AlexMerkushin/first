<template>
    <v-expansion-panels focusable multiple popout :value="[1,0]">
    <v-expansion-panel>
      <v-expansion-panel-header>סטודנטים</v-expansion-panel-header>
      <v-expansion-panel-content>
        <student :idCollege="$store.state.authUser[1].id" />
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header>מרצים</v-expansion-panel-header>
      <v-expansion-panel-content>
          
        <teacher :idCollege="$store.state.authUser[1].id" />
      </v-expansion-panel-content>
    </v-expansion-panel>
    <update-account-form />
  </v-expansion-panels>
</template>
<script>
export default {
  middleware: 'authenticated',
  head:()=>({
    title: "מכללות"
  })
}
</script>