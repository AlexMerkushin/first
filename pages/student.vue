<template>
    <v-expansion-panels focusable multiple popout :value="[0,1]">
      <v-expansion-panel>
        <v-expansion-panel-header>פרויקט</v-expansion-panel-header>
        <v-expansion-panel-content>
          <project :id="$store.state.authUser[1].id" />
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>פרטי מנחה</v-expansion-panel-header>
        <v-expansion-panel-content>
          <account :id="$store.state.authUser[1].teacherId" />
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
  head: () => ({
    title: 'סטודנט',
  }),
}
</script>
