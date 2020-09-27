<template>
  <v-expansion-panels focusable multiple popout :value="[0,1,2,3]">
    <v-expansion-panel>
      <v-expansion-panel-header>טבלת עובדים</v-expansion-panel-header>
      <v-expansion-panel-content>
          <table-worker />
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header>טבלת מכללות</v-expansion-panel-header>
      <v-expansion-panel-content>
        <table-college />
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header>טבלת בוחנים</v-expansion-panel-header>
      <v-expansion-panel-content>
        <table-examine />
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header>טבלת מגמות</v-expansion-panel-header>
      <v-expansion-panel-content>
        <table-trend />
      </v-expansion-panel-content>
    </v-expansion-panel>   
    <update-account-form />
  </v-expansion-panels>
</template>

<script>
export default {
  middleware: 'authenticated',
  head: () => ({
    title: 'עובד',
  }),
}
</script>