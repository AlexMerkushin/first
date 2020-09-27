<template>
  <v-expansion-panels focusable multiple popout :value="[0]">
    <v-expansion-panel>
      <v-expansion-panel-header>פרויקטים של סטודנטים</v-expansion-panel-header>
      <v-expansion-panel-content>
        <table-student-project-file :id="$store.state.authUser[1].id" />
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header>פרטי מכללה</v-expansion-panel-header>
      <v-expansion-panel-content>
        <get-college :id="$store.state.authUser[1].collegeId" />
      </v-expansion-panel-content>
    </v-expansion-panel>
    <update-account-form />
  </v-expansion-panels>
</template>

<script>
export default {
  middleware: 'authenticated',
  head:()=>({
    title: "מרצה"
  })
}
</script>
