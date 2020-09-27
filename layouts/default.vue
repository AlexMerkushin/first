<template>
  <v-app>
    <v-app-bar app>
      <v-avatar color="blue">
        <img src="../static/logo.png" alt="לוגו מהט" />
      </v-avatar>
      <v-avatar color="white">
        <img src="../static/logoIsrael.png" alt="לוגו ישראל" />
      </v-avatar>
      <v-spacer></v-spacer>
      <template v-if="$store.state.authUser">
        מחובר בתור {{$store.state.authUser[0].fullName}},
      <v-btn text @click="$store.dispatch('logout')">התנתק</v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <nuxt />
        {{$store.state.authUser}}
      </v-container>
    </v-main>
  </v-app>
</template>